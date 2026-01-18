import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect } from "@playwright/test";
import { SearchPage } from "../../pages/SearchPage";

let browser: Browser;
let page: Page;
let searchPage: SearchPage;

Before(async () => {
    browser = await chromium.launch({
        headless: false,
        slowMo: 200,
    });

    const context = await browser.newContext();
    page = await context.newPage();
    searchPage = new SearchPage(page);
});

After(async () => {
    await browser.close();
});

Given("je suis sur la page d'accueil pour la recherche de produits", async function () {
    await searchPage.gotoHome();
    await searchPage.acceptCookies();
});

When("j'effectue une recherche pour le terme {string}", async function (term: string) {
    const searchInput = await searchPage.getPlaceholderText();
    await searchInput.fill(term);
    await searchInput.press("Enter");
});

// ----------------------------------------------------------- //
//      Vérifier la pertinence des résultats de recherche      //
// ----------------------------------------------------------- //

Then("le titre des résultats devrait contenir {string}", async function (term: string) {
    const resultsTitle = await searchPage.getResultsTitle();
    await expect(resultsTitle).toBeVisible();
    await expect(resultsTitle).toContainText(term);
});

Then("la page des résultats devrait afficher des articles en lien avec {string}", async function (term: string) {
    const pageContent = await searchPage.getPageContent();
    await expect(pageContent.toLowerCase()).toContain(term.toLowerCase());
});

// ----------------------------------------------------------- //
//              Recherche d'un produit inexistant              //
// ----------------------------------------------------------- //

Then("je devrais voir ce message {string}", async function (message: string) {
    const resultsTitle = await searchPage.getResultsTitle();
    await expect(resultsTitle).toBeVisible();
    await expect(resultsTitle).toContainText(message);
});

Then("le site devrait me proposer des produits alternatifs", async function () {
    const otherResults = await searchPage.getOtherResultsSuggestion();
    await expect(otherResults).toBeVisible();
});
