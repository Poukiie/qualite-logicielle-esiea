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

Given("je suis sur la page d'accueil", async () => {
    await page.goto("https://www.zooplus.fr/");
    await page.getByRole('button', { name: 'Utiliser uniquement les cookies nécessaires' }).click();
});


When("j'ajoute un produit dans le panier", async () => {
    const section = page.locator('[data-name="container_3"]');
    const firstProduct = section.locator('a[class*="RecommendationProductCard_slideCard"]').first();
    await firstProduct.click();

    await page.waitForLoadState('networkidle'); // attendre que la page soit chargé

    const cartBtn = page.locator('[data-zta="SelectedArticleBox__AddToCartButton"]');
    await cartBtn.click();
});

Then("le produit est ajouté au panier", async () => {
    const title = page.locator('#cartDrawer-heading');

    await expect(title).toBeVisible();
    await expect(title).toContainText("Ajouté au panier");
});

When("je vais sur la page panier", async () => {
    await page.getByRole('link', { name: 'Vers le panier' }).click();
});

When("je clique sur le bouton de suppression du produit", async () => {
    await page.locator('[data-zta="quantityStepperDecrementButton"]').first().click();
    await page.waitForLoadState('networkidle');
});

Then("le produit devrait disparaître", async () => {
    const product = page.locator('article[data-testid="standard-article"]');
    await expect(product).toBeHidden();
});

Then("je devrais voir le message {string}", async (message: string) => {
    const notification = page.getByText(message);
    await expect(notification).toBeVisible();
});

let initialPrice: string;

When("je clique sur le bouton +", async () => {
    initialPrice = await page.locator('[data-testid="total-price-value"] [data-zta="reducedPriceAmount"]').innerText();

    await page.locator('[data-zta="quantityStepperIncrementButton"]').first().click();
    await page.waitForLoadState('networkidle');
});

Then("la quantité affichée devrait être {string}", async (value: string) => {
    const quantityInput = page.locator('[data-zta="quantityStepperInput"]').first();
    await expect(quantityInput).toHaveValue(value);
});

Then("le montant total du panier devrait être mis à jour", async () => {
    const newPrice = await page.locator('[data-testid="total-price-value"] [data-zta="reducedPriceAmount"]').innerText();

    expect(newPrice).not.toBe(initialPrice);
});