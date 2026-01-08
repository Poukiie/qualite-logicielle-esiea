Feature: Authentification
    Scenario: Connexion réussie avec des identifiants valides
        Given je suis sur la page de connexion
        And j'ai accepté les cookies
        When je me connecte avec des identifiants valides : "change@email.com", "change-mdp"
        Then je suis redirigé vers la page de mon profil