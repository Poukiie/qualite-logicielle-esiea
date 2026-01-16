import { Given, When, Then } from "@cucumber/cucumber";

// ----------------------------------------------------------- //
//           Accéder à la catégorie jouets pour chat           //
// ----------------------------------------------------------- //

Given("je suis sur la page d'accueil", async function () {
});

When(
  "je survole la catégorie {string} dans le menu",
  async function (category: string) {
  }
);

When(
  "je clique sur la sous-catégorie {string}",
  async function (subcategory: string) {
  }
);

Then(
  "la page affiche une liste de jouets spécifique aux chats",
  async function () {
  }
);

Then(
  "le fil d'Ariane doit afficher {string}",
  async function (breadcrumb: string) {
  }
);

// ----------------------------------------------------------- //
//       Filtrer les produits par une marque spécifique        //
// ----------------------------------------------------------- //

When(
  "je clique sur la rubrique {string} dans le menu",
  async function (menu: string) {
  }
);

When(
  "je sélectionne la marque {string}",
  async function (brand: string) {
  }
);

Then(
  "la page affichée ne doit contenir que des produits de la marque {string}",
  async function (brand: string) {
  }
);

Then(
  "le nombre de résultats doit être supérieur à {int}",
  async function (minResults: number) {
  }
);

// ----------------------------------------------------------- //
//             Utilisation des filtres de recherche            //
// ----------------------------------------------------------- //

Given(
  "je suis sur la page de la catégorie {string}",
  async function (category: string) {
  }
);

When(
  "je coche le filtre {string} dans la barre latérale",
  async function (filter: string) {
  }
);

Then(
  "tous les produits affichés doivent correspondre au critère {string}",
  async function (criteria: string) {
  }
);

Then(
  "l'URL doit contenir le paramètre correspondant au filtre",
  async function () {
  }
);
