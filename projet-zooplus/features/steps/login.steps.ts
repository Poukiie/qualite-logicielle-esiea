import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("je suis sur la page de connexion", async function() {
  await this.loginPage.gotoLoginPage();
});

When("je me connecte avec des identifiants : {string}, {string}",
  async function(username: string, password: string) {
  await this.loginPage.login(username, password);
});

// ------------------------------------------------------------ //
//       Connexion réussie avec des identifiants valides        //
// ------------------------------------------------------------ //

Then("je suis redirigé vers la page de mon profil", async function() {
  const welcomeTitle = await this.loginPage.getWelcomeTitle();
  await expect(welcomeTitle).toBeVisible();
  await expect(welcomeTitle).toContainText(/Bonjour/);
});

// ------------------------------------------------------------ //
//        Echec de connexion des identifiants invalides         //
// ------------------------------------------------------------ //

Then("un message d'erreur {string} devrait s'afficher", async function(message: string) {
  const alertText = await this.loginPage.getAlertText();
  
  await expect(alertText).toBeVisible();
  await expect(alertText).toContainText(message);
});
