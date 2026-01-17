# Projet Automatisation E2E avec Playwright, POM et Gherkin

## Objectifs
- Mettre en pratique l’ensemble des notions vues en TP :
- Automatisation E2E avec Playwright
- Modèle Page Object Model (POM)
- Rédaction de scénarios en BDD / Gherkin (avec @cucumber/cucumber ou playwright-bdd )
- Utilisation de mocks
- Concevoir une suite de tests complète et maintenable sur un site web réel

## Site choisi
Nous avons choisi le site Zooplus (https://www.zooplus.fr/), une boutique en ligne spécialisée dans la vente de produits pour animaux (chiens, chats, rongeurs, etc.). Ce site propose un large catalogue allant de la nourriture aux accessoires et aux jouets. C'est un support intéressant pour nos tests car il permet de simuler un parcours complet : de la recherche d'un article spécifique jusqu'à la validation du panier.

Nous allons concentrer nos tests sur :
- Authentification
- Gestion du panier
- Recherche de produit
- Navigation des différentes catégories

## Scénario
1. L'utilisateur se connecte avec son email et son mot de passe
2. Il recherche un produit via la barre de recherche ou les catégories
3. Il l'ajoute à son panier, gère la quantité de chaque produit, et valide le panier


Initier le projet :
npm init playwright@latest

Installer les dépendances nécessaires :
npm install --save-dev @cucumber/cucumber ts-node typescript

Pour lancer les tests :
npx cucumber-js --require-module ts-node/register --require features/steps/**/*.ts

npx cucumber-js
