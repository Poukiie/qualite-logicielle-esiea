import { Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addFirstProductFromSection(sectionDataName: string) {
        const section = this.page.locator(`[data-z-carousel-id="${sectionDataName}"]`);
        const firstProduct = section.locator('[data-zta="product-slide"]').first();
        await firstProduct.click();

        await this.page.waitForLoadState("networkidle"); // attendre que la page soit chargée

        const cartBtn = this.page.locator('[data-zta="SelectedArticleBox__AddToCartButton"]');
        await cartBtn.click();
    }

    async goToCart() {
        await this.page.getByRole("link", { name: "Vers le panier" }).click();
    }

    async removeFirstProduct() {
        await this.page.locator('[data-zta="quantityStepperDecrementButton"]').first().click();
        await this.page.waitForLoadState("networkidle");
    }

    async incrementQuantity() {
        await this.page.locator('[data-zta="quantityStepperIncrementButton"]').first().click();
        await this.page.waitForLoadState('networkidle');
    }

    async getTotalPrice(): Promise<string> {
        return this.page.locator('[data-testid="total-price-value"] [data-zta="reducedPriceAmount"]').innerText();
    }

    async getQuantity(): Promise<string> {
        return this.page.locator('[data-zta="quantityStepperInput"]').first().inputValue();
    }

    async getNotification(message: string) {
        return this.page.getByText(message);
    }

    async getCartTitle() {
        return this.page.locator('[data-zta="cartDrawer"] [data-zta="modalTitle"]');
    }

    async getProduct(): Promise<any> {
        return this.page.locator('article[data-testid="standard-article"]');
    }
}
