import puppeteer from "puppeteer";

export async function logRecipes(foods: string[]) {
	const queryFoods = foods.join("+");

	if (queryFoods) {
		const browser = await puppeteer.launch({
			headless: true,
		});

		const page = await browser.newPage();
		await page.goto(
			"https://www.giallozafferano.it/ricerca-ricette/" + queryFoods,
			{ waitUntil: "domcontentloaded" }
		);

		const recipes = await page.evaluate(() => {
			const recipeContainer = document.querySelector("article");
			const image = recipeContainer
				.querySelector("gz-card-image")
				.querySelector("a").href;
			const content = recipeContainer
				.querySelector("gz-card-content")
				.querySelector("h2")
				.querySelector("a");
			const title = content.title;
			const link = content.href;

			return { title, link, image };
		});

		await browser.close();

		return recipes;
	}
	return "fail";
}
