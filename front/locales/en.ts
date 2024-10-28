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
            first_name: 'First Name',
            last_name: 'Last Name',
            age: 'Age',
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
            },
            language: {
                label: 'Choose your language:',
            },
        },
    },
    actions: {
        cancel: 'Cancel',
        confirm: 'Confirm',
    },
}
