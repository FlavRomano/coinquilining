import { json } from "@sveltejs/kit";
import puppeteer from "puppeteer";

export async function GET({ request }) {
	const queryFoods = request.headers.get("foods");
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	let it = 0;
	let results: {
		page: number;
		recipes: { title: string; link: string; img: string }[];
	}[] = [];

	while (it !== 10) {
		if (it === 0) {
			await page.goto(
				"https://www.giallozafferano.it/ricerca-ricette/" + queryFoods,
				{ waitUntil: "domcontentloaded" }
			);
		} else {
			await page.goto(
				`https://www.giallozafferano.it/ricerca-ricette/page${
					it + 1
				}/${queryFoods}`,
				{ waitUntil: "domcontentloaded" }
			);
		}
		try {
			await page.waitForSelector("article");
		} catch (TimeoutError) {
			break;
		}

		const recipes = await page.evaluate(() => {
			const articles = document.querySelectorAll("article");
			const res: { title: string; link: string; img: string }[] = [];
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
					res.push({ title, img, link });
				} catch (TypeError) {}
			}
			return res;
		});
		results.push({ page: it + 1, recipes });
		it++;
	}

	await browser.close();

	return json(results);
}
