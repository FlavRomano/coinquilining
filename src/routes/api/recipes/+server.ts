import { json } from "@sveltejs/kit";
import puppeteer from "puppeteer";

export async function GET({ request }) {
	const queryFoods = request.headers.get("foods");
	const currentPage = request.headers.get("page");
	const browser = await puppeteer.launch({ headless: "new" });
	const page = await browser.newPage();
	await page.setExtraHTTPHeaders({
		"user-agent":
			"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36",
		"upgrade-insecure-requests": "1",
		accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
		"accept-encoding": "gzip, deflate, br",
		"accept-language": "en-US,en;q=0.9,en;q=0.8",
	});
	await page.setDefaultNavigationTimeout(10000);

	let results: {
		page: number;
		recipes: { title: string; link: string; img: string }[];
	}[] = [];

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
