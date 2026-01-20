import { Page } from "@playwright/test";

export class SearchPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async getPlaceholderText() {
		return this.page.locator('[data-zta="search_form_input_desktop"]');
	}

	async getResultsTitle() {
		return this.page.locator('[data-zta="page-title"]');
	}

	async getOtherResultsSuggestion() {
		return this.page.locator('[data-zta="recoSlider"]').nth(0);
	}
}