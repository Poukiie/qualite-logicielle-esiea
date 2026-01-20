Feature: Authentification

#    Scenario: Connexion réussie avec des identifiants valides
#        Given je suis sur la page de connexion
#        And j'ai accepté les cookies
#        When je me connecte avec des identifiants : "change@email.com", "change-mdp"
#        Then je suis redirigé vers la page de mon profil

    Scenario: Echec de connexion des identifiants invalides
        Given je suis sur la page de connexion
        And j'ai accepté les cookies
        When je me connecte avec des identifiants : "test@email.com", "Mdp-12345"
        Then un message d'erreur "Adresse e-mail ou mot de passe incorrect" devrait s'afficher