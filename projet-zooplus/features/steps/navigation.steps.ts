import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

// ----------------------------------------------------------- //
//           Accéder à la catégorie jouets pour chat           //
// ----------------------------------------------------------- //

Given("je suis sur la page d'accueil pour naviguer", async function() {
  await this.commonPage.gotoHome();
});

When("je clique sur la catégorie {string}", async function(category: string) {
  await this.navigationPage.navigateToCategory(category);
});

When("je clique sur la sous-catégorie {string}", async function(subcategory: string) {
  await this.navigationPage.navigateToSubCategory(subcategory);
});

Then("la page affiche une liste de jouets spécifique aux chats", async function () {
  const pageContent = await this.commonPage.getPageContent();
  await expect(pageContent.toLowerCase()).toContain("jouet");
  await expect(pageContent.toLowerCase()).toContain("pour chat");
});

Then("le fil d'Ariane doit afficher {string} et {string}",
  async function(category: string, subCategory: string) {
  await this.navigationPage.getBreadcrumb(category, subCategory);
});

// ----------------------------------------------------------- //
//       Filtrer les produits par une marque spécifique        //
// ----------------------------------------------------------- //

When(
  "je filtre la recherche par marque : {string}",
  async function(brand: string) {
    await this.navigationPage.filterByBrand(brand);
    await this.page.waitForLoadState('networkidle');
  }
);

Then(
  "la page affichée ne doit contenir que des produits de la marque {string}",
  async function(brand: string) {
    const allTitles = await this.navigationPage.getProductTitles();
    const count = await allTitles.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
        const titleText = await allTitles.nth(i).innerText();
        expect(titleText.toLowerCase()).toContain(brand.toLowerCase());
    }
  }
);

Then("le nombre de produits affichés est égal à {int}", async function (expectedCount: number) {
  const allTitles = await this.navigationPage.getProductTitles();
  const count = await allTitles.count();
  expect(count).toBe(expectedCount);
});