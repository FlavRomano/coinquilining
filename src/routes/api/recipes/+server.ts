import { json } from "@sveltejs/kit";
import puppeteer from "puppeteer";

export async function GET({ request }) {
	const cache = {};
	const queryFoods = request.headers.get("foods");
	const currentPage = request.headers.get("page");
	const browser = await puppeteer.launch({ headless: "new" });
	const page = await browser.newPage();
	await page.setDefaultNavigationTimeout(10000);
	await page.setRequestInterception(true);

	let results: {
		page: number;
		recipes: { title: string; link: string; img: string }[];
	}[] = [];

	// TODO: fix cache
	// cache
	page.on("request", async (request) => {
		const url = request.url();
		if (cache[url] && cache[url].expires > Date.now()) {
			await request.respond(cache[url]);
			return;
		}
		request.continue();
	});

	// cache
	page.on("response", async (response) => {
		const url = response.url();
		const headers = response.headers();
		const cacheControl = headers["cache-control"] || "";
		const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
		const maxAge =
			maxAgeMatch && maxAgeMatch.length > 1
				? parseInt(maxAgeMatch[1], 10)
				: 0;

		if (maxAge) {
			if (cache[url] && cache[url].expires > Date.now()) return;
		}

		let buffer;

		try {
			buffer = await response.buffer();
		} catch (err) {
			return;
		}

		cache[url] = {
			status: response.status(),
			headers: response.headers(),
			body: buffer,
			expires: Date.now() + maxAge * 1000,
		};
	});

	await page.goto(
		`https://www.giallozafferano.it/ricerca-ricette/page${currentPage}/${queryFoods}`,
		{ waitUntil: "domcontentloaded" }
	);

	try {
		await page.waitForSelector("article");
	} catch (TimeoutError) {
		throw Error("Nothing to see");
	}

	const recipes = await page.evaluate(() => {
		const articles = document.querySelectorAll("article");
		const recipes: { title: string; link: string; img: string }[] = [];
		for (let article of articles) {
			try {
				let step = article
					.querySelector("div.gz-card-content")
					.querySelector("h2");
				let img = article
					.querySelector("div.gz-card-image > a > picture > img")
					.getAttribute("src");

				let title = step.querySelector("a").innerText;
				let link = step.querySelector("a").href;
				recipes.push({ title, img, link });
			} catch (TypeError) {}
		}
		return recipes;
	});

	results.push({ page: parseInt(currentPage), recipes });

	const response = json(results);

	await browser.close();

	return response;
}
