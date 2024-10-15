export default {
    options: {
        login: 'Connexion',
        logout: 'Déconnexion',
        signup: 'Inscription',
        newComputerGame: "Partie contre l'ordinateur",
        newHumanGame: 'Partie contre un humain',
        settings: 'Réglages',
        account: 'Mon compte'
    },
    gameInfos: {
        level: 'Niveau',
        round: 'Tour',
        whiteToPlay: 'Trait aux blancs',
        blackToPlay: 'Trait aux noirs',
    },
    modals: {
        account: {
            text: 'Ajoutez quelques informations à propos de vous. Elles seront visibles quand d\'autres joueurs choisiront de jouer avec vous',
            email: 'Email',
            first_name: 'Prénom',
            last_name: 'Nom',
            age: 'Âge',
            about: 'À propos de moi',
        },
        new_game_computer: {
            text: 'Parametrez votre nouvelle partie en choisissant le niveau et votre couleur.',
            level: {
                label: 'Choisissez votre niveau',
                easy: 'Facile',
                medium: 'Moyen',
                hard: 'Difficile',
            },
            color: {
                label: "Choisissez votre couleur:",
                white: "Blanc",
                black: "Noir",
            }
        },
        new_game_human: {
            text: 'Choisissez votre adversaire parmi la liste des joueurs.',
            players: "Joueurs",
        },  
    },
    actions: {
        cancel: 'Annuler',
        confirm: 'Confirmer',
    }
}
