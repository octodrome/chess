import { useUserStore } from '~/stores/userStore'
import { useBoardStore } from '~/stores/boardStore'
import services from '~/services/index'

export const useHumanGameStore = defineStore('humanGame', {
    state: () => ({
        gameList: [],
        currentGame: null,
        isAgainstHuman: false,
    }),

    getters: {
        opponent(state) {
            const userStore = useUserStore()
            return state.currentGame?.guest._id !== userStore.user?._id
                ? state.currentGame.guest
                : state.currentGame.creator
        },

        opponentPseudo() {
            return this.opponent.email.split('@')[0]
        },
    },

    actions: {
        createGame(params) {
            return services.game.createGame(params).then((game) => {
                this.currentGame = game
                this.gameList = [...this.gameList, game]
                const boardStore = useBoardStore()
                boardStore.startNewGame('human')
                return game
            })
        },

        sendMove(params) {
            return services.game.sendMove(params).then((game) => {
                this.currentGame = game
                return game
            })
        },

        getUserGames(userId) {
            return services.game.getUserGames(userId).then((gameList) => {
                this.gameList = gameList
            })
        },

        getGame(gameId) {
            return services.game.getGame(gameId).then((game) => {
                console.log('game from getGame()', game)
                this.currentGame = game
                const boardStore = useBoardStore()
                boardStore.continueGame('human')
            })
        },

        addMessage(message) {
            if (this.currentGame) {
                this.currentGame.messages = [
                    ...this.currentGame.messages,
                    message,
                ]
            }
        },

        resetGames() {
            this.gameList = []
        },
    },
})
