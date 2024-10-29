export default {
    options: {
        login: 'Log in',
        logout: 'Log out',
        signup: 'Sign up',
        newComputerGame: 'New game VS computer',
        newHumanGame: 'New game VS human',
        settings: 'Settings',
        account: 'Account',
    },
    gameInfos: {
        level: 'Level',
        round: 'Round',
        whiteToPlay: 'White to play',
        blackToPlay: 'Black to play',
    },
    modals: {
        account: {
            text: 'Add some information about you. This will be visible when other players choose to play with you.',
            email: 'Email',
            pseudo: 'Pseudo',
            about: 'About me',
        },
        new_game_computer: {
            text: 'Set your new game choosing the level and which color you will play with.',
            level: {
                label: 'Choose your level',
                easy: 'Easy',
                medium: 'Medium',
                hard: 'Hard',
            },
            color: {
                label: 'Choose your color:',
                white: 'White',
                black: 'Black',
            },
        },
        new_game_human: {
            text: 'Choose your opponent among the players list.',
            default:
                'No other players, share chess URL with your friends to play against them',
            players: 'Players',
        },
        settings: {
            text: 'Manage your preferences.',
            display_scheme: {
                label: 'Choose your display scheme:',
                dark: 'Dark mode',
                light: 'Light mode',
            },
            language: {
                label: 'Choose your language:',
                en: 'English',
                fr: 'French',
            },
        },
        confirm: {
            text: 'Are you sure you want to delete this game?',
        },
    },
    actions: {
        cancel: 'Cancel',
        confirm: 'Confirm',
    },
    snackbar: {
        error: {
            email_password: 'Wrong email or password',
            game_creation: 'Error creating the game',
            game_update: 'Error updating the game',
        },
        success: {},
    },
}
