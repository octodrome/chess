import { useUserStore } from '~/stores/userStore'
import { useBoardStore } from '~/stores/boardStore'
import services from '~/services/index'
import Game from 'chess-legal-moves'
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
            return state.currentGame?.guest.id !== userStore.user?.id
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
                    (game) => game.id !== Number(gameId)
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
                const gameAnalysis = new Game(game.data.fen)

                this.currentGame = game.data
                const boardStore = useBoardStore()
                const userStore = useUserStore()
                boardStore.initBoard({
                    opponentType: 'human',
                    playerColor:
                        game.data.creator_id === userStore.user?.id // @TODO 🖐️ pb here if user is not already populated - get id from token ?
                            ? game.data.creator_color
                            : game.data.guest_color,
                    guestColor:
                        game.data.creator_id === userStore.user?.id // @TODO 🖐️ pb here if user is not already populated - get id from token ?
                            ? game.data.guest_color
                            : game.data.creator_color,
                    hasToPlay: gameAnalysis.state.hasToPlay,
                    round: gameAnalysis.state.fullMoveClock,
                    fenBoard: gameAnalysis.state.fenBoard,
                    legalMoves: gameAnalysis.scan.legalMoves,
                    moves: game.data.moves.split(' '),
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
