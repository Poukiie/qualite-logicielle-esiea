Feature: Navigation
    Scenario: Accéder à la catégorie jouets pour chat
        Given je suis sur la page d'accueil
        When je clique sur la catégorie "Chat"
        And je clique sur la sous-catégorie "Jouet et jeu pour chat"
        Then la page affiche une liste de jouets spécifique aux chats
        And le fil d'Ariane doit afficher "Chat > Jouet et jeu pour chat"

    Scenario: Filtrer les produits par une marque spécifique
        Given je suis sur la page d'accueil
        When je clique sur la catégorie "Chat"
        And je clique sur la sous-catégorie "Jouet et jeu pour chat"
        And je filtre la recherche par "Marque" : "animallparadise"
        Then la page affichée ne doit contenir que des produits de la marque "animallparadise"