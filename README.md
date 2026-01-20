# Projet Automatisation E2E avec Playwright, POM et Gherkin

## Objectifs
- Mettre en pratique l’ensemble des notions vues en TP :
- Automatisation E2E avec Playwright
- Modèle Page Object Model (POM)
- Rédaction de scénarios en BDD / Gherkin (avec @cucumber/cucumber ou playwright-bdd )
- Rédaction de scénarios en BDD / Gherkin (avec @cucumber/cucumber ou playwright-bdd)
- Utilisation de mocks
- Concevoir une suite de tests complète et maintenable sur un site web réel

## Installation
1. Une fois le repo cloné, aller dans le dossier du projet
`cd .\projet-zooplus\`

2. Initier le projet :
`npm init playwright@latest`

3. Installer les dépendances nécessaires :
``npm install --save-dev @cucumber/cucumber ts-node typescript`

4. Lancez les tests avec une des deux commandes :
`npx cucumber-js --require-module ts-node/register --require features/steps/**/*.ts`
`npx cucumber-js`

## Site choisi
Nous avons choisi le site Zooplus (https://www.zooplus.fr/), une boutique en ligne spécialisée dans la vente de produits pour animaux (chiens, chats, rongeurs, etc.). Ce site propose un large catalogue allant de la nourriture aux accessoires et aux jouets. C'est un support intéressant pour nos tests car il permet de simuler un parcours complet : de la recherche d'un article spécifique jusqu'à la validation du panier.
L'authentification est simple et ne nécessite pas de double vérification, ce qui est idéal pour nos tests.

Nous allons concentrer nos tests sur :
- Authentification
- Gestion du panier
- Recherche de produits via la barre de recherche
- Navigation dans les différentes catégories des menus

## Scénarios

### Authentification

#### Scénario 1 : Connexion réussie avec des identifiants valides
1. L'utilisateur est sur la page de connexion et a accepté les cookies
2. L'utilisateur se connecte avec son email et son mot de passe (nécessite de créer un compte avant)
3. Il est redirigé vers la page de son profil

#### Scénario 2 : Echec de connexion des identifiants invalides
1. L'utilisateur est sur la page de connexion et a accepté les cookies
2. L'utilisateur se connecte avec ces identifiants : "test@email.com", "Mdp-12345"
3. Un message d'erreur "Adresse e-mail ou mot de passe incorrect" devrait s'afficher

### Gestion du panier
Ajouter un produit au panier

### Recherche de produits
Il recherche un produit via la barre de recherche ou les catégories

### Navigation dans les catégories
Il l'ajoute à son panier, gère la quantité de chaque produit, et valide le panier