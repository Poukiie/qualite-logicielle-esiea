Feature: Panier
    Scenario: Ajouter un produit au panier
        Given je suis sur la page d'accueil
        When j'ajoute un produit dans le panier
        Then le produit est ajouté au panier

    Scenario: Supprimer un produit présent dans le panier
        Given je suis sur la page d'accueil
        And j'ajoute un produit dans le panier
        When je vais sur la page panier
        And je clique sur le bouton de suppression du produit
        Then le produit devrait disparaître
        And je devrais voir le message "L'article a bien été supprimé."

    Scenario: Modifier la quantité d'un produit présent dans le panier
        Given je suis sur la page d'accueil
        And j'ajoute un produit dans le panier
        When je vais sur la page panier
        And je clique sur le bouton +
        Then la quantité affichée devrait être "2"
        And le montant total du panier devrait être mis à jour