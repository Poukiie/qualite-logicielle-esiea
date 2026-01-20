import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { CommonPage } from "../pages/CommonPage";
import { LoginPage } from "../pages/LoginPage";
import { CartPage } from "../pages/CartPage";
import { SearchPage } from "../pages/SearchPage";
import { NavigationPage } from "../pages/NavigationPage";

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  commonPage!: CommonPage;
  loginPage!: LoginPage;
  cartPage!: CartPage;
  searchPage!: SearchPage;
  navigationPage!: NavigationPage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
