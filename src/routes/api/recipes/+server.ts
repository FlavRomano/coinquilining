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
