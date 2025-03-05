export default {
    options: {
        login: 'Connexion',
        logout: 'Déconnexion',
        signup: 'Inscription',
        newComputerGame: "Jouer contre l'ordinateur",
        newHumanGame: 'Jouer contre un humain',
        settings: 'Réglages',
        account: 'Mon compte',
    },
    gameInfos: {
        round: 'Tour',
        whiteToPlay: 'Trait aux blancs',
        blackToPlay: 'Trait aux noirs',
    },
    modals: {
        login: {
            text: "Connectez-vous pour jouer contre n'importe qui. Vous n'avez pas encore de compte? Cliquez ici pour en créer un.",
            email: 'Email',
            password: 'Mot de passe',
        },
        signup: {
            text: "Créez votre compte pour jouer contre n'importe quel utilisateur connecté. Vous avez déjà un compte? Cliquez ici pour vous connecter.",
            email: 'Email',
            password: 'Mot de passe',
        },
        account: {
            text: "Ajoutez quelques informations à propos de vous. Elles seront visibles quand d'autres joueurs choisiront de jouer avec vous",
            email: 'Email',
            pseudo: 'Pseudo',
            about: 'À propos de moi',
        },
        new_game_computer: {
            text: 'Parametrez votre nouvelle partie en choisissant le niveau et votre couleur.',
            level: {
                label: 'Choisissez votre niveau:',
                easy: 'Facile',
                medium: 'Moyen',
                hard: 'Difficile',
            },
            color: {
                label: 'Choisissez votre couleur:',
                white: 'Blanc',
                black: 'Noir',
            },
        },
        new_game_human: {
            text: 'Choisissez votre adversaire parmi la liste des joueurs.',
            default:
                "Pas d'autres joueurs, partager l'URL de chess avec vos amis pour jouer contre eux",
            players: 'Joueurs:',
            color: {
                label: 'Choisissez votre couleur:',
                white: 'Blanc',
                black: 'Noir',
            },
        },
        settings: {
            text: 'Gérez vos preferences.',
            display_scheme: {
                label: 'Choisissez votre thème:',
                dark: 'Mode sombre',
                light: 'Mode clair',
            },
            language: {
                label: 'Choisissez votre langue:',
                en: 'Anglais',
                fr: 'Français',
            },
        },
        confirm: {
            text: 'Voulez-vous vraiment supprimer ce jeu?',
        },
    },
    actions: {
        cancel: 'Annuler',
        confirm: 'Confirmer',
    },
    snackbar: {
        error: {
            email_password: 'Adresse email ou mot de passe incorrect',
            game_creation:
                'Une erreur est survenue pendant la création de la partie',
            game_update:
                "Une erreur est survenue pendant la modification des donnees de l'utilisateur",
        },
        success: {},
    },
    credits: {
        start: 'Fait avec ♥ par',
        middle: 'sur',
    },
}
