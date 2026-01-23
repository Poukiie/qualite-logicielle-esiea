import { Page } from "@playwright/test";

export class SearchPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async search(term: string) {
		const searchInput = await this.page.locator('[data-zta="search_form_input_desktop"]');
		await searchInput.fill(term);
		await searchInput.press("Enter");
	}

	async getResultsTitle() {
		return this.page.locator('[data-zta="page-title"]');
	}

	async getOtherResultsSuggestion() {
		return this.page.locator('[data-zta="recoSlider"]').nth(0);
	}

	async getProductTitles() {
		return this.page.locator('[data-testid="product-card"] h2').count();
	}
}