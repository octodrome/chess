import { useUserStore } from '~/stores/userStore'
import { useBoardStore } from '~/stores/boardStore'
import services from '~/services/index'
import type {
    ICreateHumanGameRequestParams,
    IUpdateHumanGameRequestParams,
} from '~/types/humanGame'

export const useHumanGameStore = defineStore('humanGame', {
    state: () => ({
        gameList: [],
        currentGame: null,
        isAgainstHuman: false,
    }),

    getters: {
        opponent(state) {
            const userStore = useUserStore()
            return state.currentGame?.guest.ID !== userStore.user?.ID
                ? state.currentGame.guest
                : state.currentGame.creator
        },

        opponentPseudo() {
            return this.opponent.email.split('@')[0]
        },
    },

    actions: {
        async createGame(params: ICreateHumanGameRequestParams) {
            return services.game.createGame(params).then((game) => {
                this.currentGame = game
                this.gameList = [...this.gameList, game]
                const boardStore = useBoardStore()
                boardStore.startNewGame('human')
                return game
            })
        },

        async deleteGame(gameId: string) {
            return services.game.deleteGame(gameId).then(() => {
                this.currentGame = null
                this.gameList = this.gameList.filter(
                    (game) => game.ID !== gameId
                )
            })
        },

        async sendMove(params: IUpdateHumanGameRequestParams) {
            return services.game.sendMove(params).then((game) => {
                this.currentGame = game
                return game
            })
        },

        async getUserGames() {
            return services.game.getUserGames().then((gameList) => {
                this.gameList = gameList
            })
        },

        async getGame(gameId: string) {
            return services.game.getGame(gameId).then((game) => {
                this.currentGame = game.data
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
