import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { CommonPage } from "../../pages/CommonPage";
import { LoginPage } from "../../pages/LoginPage";
import { CartPage } from "../../pages/CartPage";
import { SearchPage } from "../../pages/SearchPage";
import { NavigationPage } from "../../pages/NavigationPage";

setDefaultTimeout(30000);

Before(async function () {
    this.browser = await chromium.launch({
        headless: false,
        slowMo: 200,
    });

    const context = await this.browser.newContext();
    this.page = await context.newPage();

    this.commonPage = new CommonPage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.searchPage = new SearchPage(this.page);
    this.navigationPage = new NavigationPage(this.page);
});

After(async function () {
    await this.browser.close();
});