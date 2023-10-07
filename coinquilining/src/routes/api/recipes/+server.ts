import { json } from "@sveltejs/kit";
import puppeteer from "puppeteer";

export async function GET({ request }) {
	const queryFoods = request.headers.get("foods");
	const browser = await puppeteer.launch({
		headless: false,
	});

	const page = await browser.newPage();
	// await page.goto(
	// 	"https://www.giallozafferano.it/ricerca-ricette/" + queryFoods,
	// 	{ waitUntil: "domcontentloaded" }
	// );
	await page.goto("https://www.giallozafferano.it", {
		waitUntil: "domcontentloaded",
	});
	await page.waitForSelector(
		"body > div.gz-page.mh2021Page > main > nav.gz-innerwrapper.gz-index-nav.gz-index-nav-visible.gz-fullbg > ul > li:nth-child(1) > a"
	);

	// const recipes = await page.evaluate(() => {
	// 	// const recipeContainer = document.querySelector(
	// 	// 	"body > div.gz-page.mh2021Page > main > div > div > div.gz-inner > h1"
	// 	// );
	// 	// const content = recipeContainer
	// 	// 	.querySelector("gz-card-content")
	// 	// 	.querySelector("h2")
	// 	// 	.querySelector("a");
	// 	// const title = content.title;
	// 	// const link = content.href;
	// 	let title = document.URL;
	// 	return { };
	// });

	let data = await page.evaluate(
		() =>
			document.querySelector(
				"body > div.gz-page.mh2021Page > main > nav.gz-innerwrapper.gz-index-nav.gz-index-nav-visible.gz-fullbg > ul > li:nth-child(1) > a"
			).innerHTML
	);

	console.log(data);

	await browser.close();

	return new Response(JSON.stringify({ data }), { status: 200 });
}
