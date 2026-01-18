import { Page, expect } from "@playwright/test";

export class SearchPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async gotoHome() {
        await this.page.goto("https://www.zooplus.fr/");
    }

    async acceptCookies() {
        await this.page.getByRole('button', { name: 'Utiliser uniquement les cookies nécessaires' }).click();
    }

	async getPlaceholderText() {
		return this.page.locator('[data-zta="search_form_input_desktop"]');
	}

	async getResultsTitle() {
		return this.page.locator('[data-zta="page-title"]');
	}

	async getPageContent() {
		return this.page.content();
	}

	async getOtherResultsSuggestion() {
		return this.page.locator('[data-zta="recoSlider"]').filter({ hasText: 'Autres articles intéssants' });
	}
}