import { Page, expect } from "@playwright/test";

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
}