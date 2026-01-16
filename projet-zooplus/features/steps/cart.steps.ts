import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect } from "@playwright/test";
import { CartPage } from "../../pages/CartPage";

let browser: Browser;
let page: Page;
let cartPage: CartPage;
let initialPrice: string;

Before(async () => {
    browser = await chromium.launch({
        headless: false,
        slowMo: 200,
    });

    const context = await browser.newContext();
    page = await context.newPage();
    cartPage = new CartPage(page);
});

After(async () => {
    await browser.close();
});

// ---------------------------------------------------------- //
//                Ajouter un produit au panier                //
// ---------------------------------------------------------- //

Given("je suis sur la page d'accueil", async () => {
    await cartPage.gotoHome();
    await cartPage.acceptCookies();
});

When("j'ajoute un produit dans le panier", async () => {
    await cartPage.addFirstProductFromSection("container_3");
});

Then("le produit est ajouté au panier", async () => {
    const title = await cartPage.getCartTitle();
    await expect(title).toBeVisible();
    await expect(title).toContainText("Ajouté au panier");
});

When("je vais sur la page panier", async () => {
    await cartPage.goToCart();
});

// ----------------------------------------------------------- //
//         Supprimer un produit présent dans le panier         //
// ----------------------------------------------------------- //

When("je clique sur le bouton de suppression du produit", async () => {
    await cartPage.removeFirstProduct();
});

Then("le produit devrait disparaître", async () => {
    const product = await cartPage.getProduct();
    await expect(product).toBeHidden();
});

Then("je devrais voir le message {string}", async (message: string) => {
    const notification = await cartPage.getNotification(message);
    await expect(notification).toBeVisible();
});

// ------------------------------------------------------------------ //
//      Modifier la quantité d'un produit présent dans le panier      //
// ------------------------------------------------------------------ //

When("je clique sur le bouton +", async () => {
    initialPrice = await cartPage.getTotalPrice();
    await cartPage.incrementQuantity();
});

Then("la quantité affichée devrait être {string}", async (value: string) => {
    const quantity = await cartPage.getQuantity();
    expect(quantity).toBe(value);
});

Then("le montant total du panier devrait être mis à jour", async () => {
    const newPrice = await cartPage.getTotalPrice();
    expect(newPrice).not.toBe(initialPrice);
});
