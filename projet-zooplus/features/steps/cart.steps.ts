import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

let initialPrice: string;

// ---------------------------------------------------------- //
//                Ajouter un produit au panier                //
// ---------------------------------------------------------- //

Given("je suis sur la page d'accueil", async function() {
    await this.commonPage.gotoHome();
    await this.commonPage.acceptCookies();
});

When("j'ajoute un produit dans le panier", async function() {
    await this.cartPage.addFirstProductFromSection("container_3");
});

Then("le produit est ajouté au panier", async function() {
    const title = await this.cartPage.getCartTitle();
    await expect(title).toBeVisible();
    await expect(title).toContainText("Ajouté au panier");
});

When("je vais sur la page panier", async function() {
    await this.cartPage.goToCart();
});

// ----------------------------------------------------------- //
//         Supprimer un produit présent dans le panier         //
// ----------------------------------------------------------- //

When("je clique sur le bouton de suppression du produit", async function() {
    await this.cartPage.removeFirstProduct();
});

Then("le produit devrait disparaître", async function() {
    const product = await this.cartPage.getProduct();
    await expect(product).toBeHidden();
});

Then("je devrais voir le message {string}", async function(message: string) {
    const notification = await this.cartPage.getNotification(message);
    await expect(notification).toBeVisible();
});

// ------------------------------------------------------------------ //
//      Modifier la quantité d'un produit présent dans le panier      //
// ------------------------------------------------------------------ //

When("je clique sur le bouton +", async function() {
    initialPrice = await this.cartPage.getTotalPrice();
    await this.cartPage.incrementQuantity();
});

Then("la quantité affichée devrait être {string}", async function(value: string) {
    const quantity = await this.cartPage.getQuantity();
    expect(quantity).toBe(value);
});

Then("le montant total du panier devrait être mis à jour", async function() {
    const newPrice = await this.cartPage.getTotalPrice();
    expect(newPrice).not.toBe(initialPrice);
});
