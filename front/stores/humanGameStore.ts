import { useUserStore } from '~/stores/userStore'
import { useBoardStore } from '~/stores/boardStore'
import services from '~/services/index'
import type {
    ICreateHumanGameRequestParams,
    IMessage,
    IUpdateHumanGameRequestParams,
} from '~/types/humanGame'
import type { ApiGame } from '~/types/api/game'

export const useHumanGameStore = defineStore('humanGame', {
    state: () => ({
        gameList: [] as ApiGame[],
        currentGame: null as ApiGame | null,
        isAgainstHuman: false,
    }),

    getters: {
        opponent(state) {
            const userStore = useUserStore()
            return state.currentGame?.guest.ID !== userStore.user?.ID
                ? state.currentGame?.guest
                : state.currentGame?.creator
        },

        pseudoFromEmail() {
            // @ts-ignore
            return this.opponent?.email.split('@')[0]
        },
    },

    actions: {
        async createGame(params: ICreateHumanGameRequestParams) {
            return services.game.createGame(params).then((game) => {
                this.currentGame = game.data
                this.gameList = [...this.gameList, game.data]
                const boardStore = useBoardStore()
                boardStore.startNewGame('human')
                return game.data
            })
        },

        async deleteGame(gameId: string) {
            return services.game.deleteGame(gameId).then(() => {
                this.currentGame = null
                this.gameList = this.gameList.filter(
                    (game) => game.ID !== Number(gameId)
                )
            })
        },

        async sendMove(params: IUpdateHumanGameRequestParams) {
            return services.game.sendMove(params).then((game) => {
                this.currentGame = game.data
                return game
            })
        },

        async getUserGames() {
            return services.game.getUserGames().then((gameList) => {
                this.gameList = gameList.data
            })
        },

        async getGame(gameId: string) {
            return services.game.getGame(gameId).then((game) => {
                console.log('👨‍💻___human_game___', game)
                this.currentGame = game.data
                const boardStore = useBoardStore()
                boardStore.initBoard({
                    opponentType: 'human',
                    playerColor: 'white',
                    hasToPlay: 'w',
                    round: 1,
                    fenBoard:
                        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                    legalMoves: [],
                    moves: [],
                    creator_captured_pieces: [],
                    guest_captured_pieces: [],
                })
                return game
            })
        },

        addMessage(message: IMessage) {
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
