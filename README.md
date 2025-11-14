# Projet Automatisation E2E avec Playwright, POM et Gherkin

## Objectifs
- Mettre en pratique l’ensemble des notions vues en TP :
- Automatisation E2E avec Playwright
- Modèle Page Object Model (POM)
- Rédaction de scénarios en BDD / Gherkin (avec @cucumber/cucumber ou playwright-bdd )
- Utilisation de mocks
- Concevoir une suite de tests complète et maintenable sur un site web réel

## Site choisi
Nous avons choisi le site Spotify, un plateforme de streaming de musique permettant à l'utilisateur de rechercher des titres, artistes, albums, de créer des playlists et ajouter ou supprimer des titres à ces playlists.

Nous allons nous concentrer nos tests sur :
- La connexion
- La création d'une playlist
- L'ajout d'un titre à une playlist

## Scénario
1. L'utilisateur se connecte avec son email et son mot de passe
2. Il crée une playlist, qui se nomme par défaut "Ma Playlist N°1"
3. Il recherche un titre dans la barre de recherche et clique sur "Ajouter" pour l'ajouter à la playlist
