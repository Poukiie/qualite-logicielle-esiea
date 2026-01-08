import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect } from "@playwright/test";

let browser: Browser;
let page: Page;

// Hook exécuté avant chaque scénario
Before(async () => {
  browser = await chromium.launch({
    headless: false, // ← Mode headed
    slowMo: 200, // Optionnel : ralentit les actions pour mieux voir
  });
  const context = await browser.newContext();
  page = await context.newPage();
});

// Hook exécuté après chaque scénario
After(async () => {
  await browser.close();
});

Given("je suis sur la page de connexion", async () => {
  await page.goto("https://www.zooplus.fr/account/overview");
  // ou appuyer sur la div avec id=shopHeaderAccountLink
});

Given("j'ai accepté les cookies", async () => {
  await page.getByRole('button', { name: 'Utiliser uniquement les cookies nécessaires' }).click();
});

When("je me connecte avec des identifiants valides : {string}, {string}", async (username: string, password: string) => {
  await page.getByLabel("Adresse e-mail").fill(username);
  await page.getByRole('textbox', { name: "Mot de passe" }).fill(password);

  await page.getByRole("button", { name: "M'identifier" }).click();
});

Then("je suis redirigé vers la page de mon profil", async () => {
  const welcomeTitle = page.locator('[data-zta="welcome-section-title"]');

  await expect(welcomeTitle).toBeVisible();
  await expect(welcomeTitle).toContainText(/Bonjour/);
});