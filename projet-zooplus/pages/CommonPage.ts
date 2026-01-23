import { Page } from "@playwright/test";

export class CommonPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoHome() {
        await this.page.goto("https://www.zooplus.fr/");
        await this.page.waitForLoadState("networkidle"); // attendre que la page soit chargée
        await this.page.getByRole('button', { name: 'Utiliser uniquement les cookies nécessaires' }).click();
    }

    async getPageContent() {
		return this.page.content();
	}
}