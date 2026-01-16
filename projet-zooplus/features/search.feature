Feature: Recherche de produit
    Scenario: Vérifier la pertinence des résultats de recherche
        Given je suis sur la page d'accueil
        When j'effectue une recherche pour le terme "croquettes"
        Then le titre des résultats devrait contenir "croquettes"
        And la page des résultats devrait afficher des articles en lien avec "croquettes"

    Scenario: Recherche d'un produit inexistant
        Given je suis sur la page d'accueil
        When "j'effectue une recherche pour le terme "jytdytdyfg"
        Then je devrais voir le message "Nous n'avons trouvé aucune correspondance"
        And le site devrait me proposer des produits alternatifs