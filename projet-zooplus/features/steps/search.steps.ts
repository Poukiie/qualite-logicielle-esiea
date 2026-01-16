import { Given, When, Then } from "@cucumber/cucumber";


Given("je suis sur la page d'accueil", async function () {

});

When("j'effectue une recherche pour le terme {string}", async function (term: string) {

});

// ----------------------------------------------------------- //
//      Vérifier la pertinence des résultats de recherche      //
// ----------------------------------------------------------- //

Then("le titre des résultats devrait contenir {string}", async function (term: string) {

});

Then("la page des résultats devrait afficher des articles en lien avec {string}", async function (term: string) {

});

// ----------------------------------------------------------- //
//              Recherche d'un produit inexistant              //
// ----------------------------------------------------------- //

Then("je devrais voir le message {string}", async function (message: string) {

});

Then("le site devrait me proposer des produits alternatifs", async function () {

});
