import { Page } from "@playwright/test";

export class NavigationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToCategory(category: string) {
        await this.page.locator('[data-zta="lower-bar-category-slider"]').getByRole('link', { name: category, exact: true }).click();
    }

    async navigateToSubCategory(subCategory: string) {
        return this.page.locator('[data-zta="categories-list"]').getByRole('link', { name: subCategory }).click();
    }

    async getBreadcrumb(category: string, subCategory: string) {
        const breadcrumb = this.page.locator('[data-zta="BreadcrumbUIC"]');
        await breadcrumb.getByRole('link', { name: category });
        await breadcrumb.getByRole('listitem', {name: subCategory});
    }

    async filterByBrand(brand: string) {
        return this.page.locator('[data-zta="accordion-content"]').getByRole('checkbox', { name: brand }).click();
    }

    async getProductTitles() {
        return this.page.locator('[data-zta="product-grid-wrapper"] h2[data-zta="product-title"]');
    }
}