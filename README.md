# Projet Automatisation E2E avec Playwright, POM et Gherkin

## Membres de l'équipe
- CHEN Lorie
- LIM Réléna

---

## Objectifs
- Mettre en pratique l’ensemble des notions vues en TP :
- Automatisation E2E avec Playwright
- Modèle Page Object Model (POM)
- Rédaction de scénarios en BDD / Gherkin (avec @cucumber/cucumber ou playwright-bdd)
- Utilisation de mocks
- Concevoir une suite de tests complète et maintenable sur un site web réel

---

## Installation
1. Une fois le repo cloné, aller dans le dossier du projet :
```
cd .\projet-zooplus\
```

2. Installer les dépendances nécessaires :
```
npm install --save-dev @cucumber/cucumber ts-node typescript
npx playwright install
```

3. Lancez les tests avec la commande :
```
npx cucumber-js
```
---

## Site choisi
Nous avons choisi le site Zooplus (https://www.zooplus.fr/), une boutique en ligne spécialisée dans la vente de produits pour animaux (chiens, chats, rongeurs, etc.). Ce site propose un large catalogue allant de la nourriture aux accessoires et aux jouets. C'est un support intéressant pour nos tests car il permet de simuler un parcours complet : de la recherche d'un article spécifique jusqu'à la validation du panier.
L'authentification est simple et ne nécessite pas de double vérification, ce qui est idéal pour nos tests.

Nous allons concentrer nos tests sur :
- Authentification
- Gestion du panier
- Recherche de produits via la barre de recherche
- Navigation dans les différentes catégories des menus

---

## Scénarios

### 🔐 Authentification

#### 📝 Scénario 1 : Connexion réussie avec des identifiants valides
1. L'utilisateur est sur la page de connexion et a accepté les cookies
2. L'utilisateur se connecte avec son email et son mot de passe (nécessite de créer un compte avant)
3. Il est redirigé vers la page de son profil

#### 📝 Scénario 2 : Echec de connexion des identifiants invalides
1. L'utilisateur est sur la page de connexion et a accepté les cookies
2. L'utilisateur se connecte avec ces identifiants : "test@email.com", "Mdp-12345"
3. Un message d'erreur "Adresse e-mail ou mot de passe incorrect" devrait s'afficher

> [!NOTE]  
> L'authentification n'est pas nécessaire pour les tests suivants. Chaque test nécessitera au départ d'aller sur la page d'accueil et d'accepter les cookies.

---

### 🛒 Gestion du panier

#### 📝 Scénario 1 : Ajouter un produit au panier

1. L'utilisateur est sur la page d'accueil et a accepté les cookies
2. Il ajoute un produit dans le panier
3. Le produit est bien ajouté au panier

#### 📝 Scénario 2 : Supprimer un produit présent dans le panier

1. L'utilisateur est sur la page d'accueil et a accepté les cookies
2. Il ajoute un produit dans le panier
3. Lorsqu'il va dans son panier et qu'il clique sur le bouton de suppression d'un produit, ce dernier devrait disparaitre
4. Le message "L'article a bien été supprimé." doit s'afficher

#### 📝 Scénario 3 : Modifier la quantité d'un produit présent dans le panier

1. L'utilisateur est sur la page d'accueil et a accepté les cookies
2. Il ajoute un produit dans le panier
3. Lorsqu'il va dans son panier et qu'il clique sur le bouton + pour un produit, la quantité affichée devrait être "2"
4. Le montant total du panier devrait être mis à jour

---

### 🔍 Recherche de produits

#### 📝 Scénario 1 : Vérifier la pertinence des résultats de recherche
1. L'utilisateur est sur la page d'accueil et a accepté les cookies
2. Lorsqu'il effectue une recherche pour le terme "croquettes", le titre des résultats devrait contenir "croquettes"
3. La page des résultats devrait afficher des articles en lien avec "croquettes"

#### 📝 Scénario 2 : Recherche d'un produit inexistant
1. L'utilisateur est sur la page d'accueil et a accepté les cookies
2. Lorsqu'il effectue une recherche pour le terme "jytdytdyfg", il devrait voir un message d'erreur précis (aucune correspondance pour "jytdytdyfg".)
3. Le site devrait lui proposer des produits alternatifs

---

### 🗺️ Navigation dans les catégories

#### 📝 Scénario 1 : Accéder à la catégorie jouets pour chat
1. L'utilisateur est sur la page d'accueil et a accepté les cookies
2. Il clique sur la catégorie "Chat" puis clique sur la sous-catégorie "Jouet et jeu pour chat"
3. La page affiche une liste de jouets spécifique aux chats
4. Le fil d'Ariane doit afficher "Chat" et "Jouet et jeu pour chat"

#### 📝 Scénario 2 : Filtrer les produits par une marque spécifique
1. L'utilisateur est sur la page d'accueil et a accepté les cookies
2. Il clique sur la catégorie "Chat" puis clique sur la sous-catégorie "Jouet et jeu pour chat"
3. Il filtre la recherche en sélectionnant une marque
4. La page affichée ne doit contenir que des produits de la marque sélectionnée
5. Le nombre de produits affichés doit égal au total des résultats indiqués

---

## Difficultés rencontrées
La prise en main du projet a été assez complexe au début. Même si nous avions déjà réalisé des TPs en cours, ceux-ci avaient été abordés rapidement, ce qui ne rendait pas évident l’organisation d’un projet respectant l'ensemble des spécifications demandées.  
Une fois le sujet mieux compris et après avoir assimilé le fonctionnement de Playwright et de Cucumber, la mise en place des scénarios de test est devenue beaucoup plus simple.

La partie la plus complexe a concerné la mise en place des mocks. Le site ne semblant pas exposer d’API directement exploitable pour la recherche, nous n’avons pas pu mocker des réponses JSON classiques. Nous avons donc choisi de mocker les requêtes réseau en renvoyant une page HTML simulée contenant des données de test.

Cette approche nous a permis de tester l’interface utilisateur de manière isolée, sans dépendre du backend. Par conséquent, nous n’avons créé qu’un seul scénario mocké, car il ne semblait pas pertinent d’en réaliser plusieurs. En effet, nous contrôlons entièrement le contenu de la page HTML simulée, ce qui rend la répétition des scénarios superflue.
