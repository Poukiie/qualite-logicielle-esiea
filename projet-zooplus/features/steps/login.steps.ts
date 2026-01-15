import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

Before(async () => {
  browser = await chromium.launch({
    headless: false,
    slowMo: 200,
  });

  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
});

After(async () => {
  await browser.close();
});

Given("je suis sur la page de connexion", async () => {
  await loginPage.gotoLoginPage();
});

Given("j'ai accepté les cookies", async () => {
  await loginPage.acceptCookies();
});

When("je me connecte avec des identifiants valides : {string}, {string}", async (username: string, password: string) => {
  await loginPage.login(username, password);
});

Then("je suis redirigé vers la page de mon profil", async () => {
  const welcomeTitle = await loginPage.getWelcomeTitle();
  await expect(welcomeTitle).toBeVisible();
  await expect(welcomeTitle).toContainText(/Bonjour/);
});
