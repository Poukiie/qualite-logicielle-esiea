import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { mockSearch } from "../../mocks/search.mocks";


Given("je suis sur la page d'accueil pour la recherche de produits", async function() {
    await this.commonPage.gotoHome();
    await this.commonPage.acceptCookies();
});

When("j'effectue une recherche pour le terme {string}", async function(term: string) {
    await this.searchPage.search(term);
});

// ----------------------------------------------------------- //
//      Vérifier la pertinence des résultats de recherche      //
// ----------------------------------------------------------- //

Then("le titre des résultats devrait contenir {string}", async function(term: string) {
    const resultsTitle = await this.searchPage.getResultsTitle();
    await expect(resultsTitle).toBeVisible();
    await expect(resultsTitle).toContainText(term);
});

Then("la page des résultats devrait afficher des articles en lien avec {string}", async function(term: string) {
    const pageContent = await this.commonPage.getPageContent();
    await expect(pageContent.toLowerCase()).toContain(term.toLowerCase());
});

// ----------------------------------------------------------- //
//              Recherche d'un produit inexistant              //
// ----------------------------------------------------------- //

Then("je devrais voir ce message {string}", async function(message: string) {
    const resultsTitle = await this.searchPage.getResultsTitle();
    await expect(resultsTitle).toBeVisible();
    await expect(resultsTitle).toContainText(message);
});

Then("le site devrait me proposer des produits alternatifs", async function() {
    const otherResults = await this.searchPage.getOtherResultsSuggestion();
    await expect(otherResults).toBeVisible();
});

// ----------------------------------------------------------- //
//                     Mock de la recherche                    //
// ----------------------------------------------------------- //

When("j'effectue une recherche mocké pour le terme {string}", async function (term: string) {
    await mockSearch(this.page);
    await this.page.goto(`https://www.zooplus.fr/search/results?q=${term}`);
});

Then("la page des résultats mocké devrait afficher des articles en lien avec {string}", async function (term: string) {
    const productTitles = await this.searchPage.getProductTitles();
    await expect(productTitles).toEqual(2);
});