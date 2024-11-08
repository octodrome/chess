import { useBoardStore } from '~/stores/boardStore'
import services from '~/services/index'
import Game from 'chess-legal-moves'
import type {
    IComputerGame,
    ICreateComputerGameParams,
} from '~/types/computerGame'

export const useComputerGameStore = defineStore('computerGame', {
    state: () => ({
        gameList: [] as IComputerGame[],
        currentGame: null as IComputerGame | null,
    }),

    actions: {
        async createGame(params: ICreateComputerGameParams) {
            return services.localGame
                .createLocalGame(params)
                .then((newGame) => {
                    this.SET_CURRENT_GAME(newGame)
                    this.ADD_GAME(newGame)

                    return newGame
                })
        },

        sendMoves(moves: string[]) {
            const lastMove = moves[moves.length - 1]

            if (this.currentGame) {
                // @TODO update the lib to prevent from creating a second object like this
                const game = new Game(this.currentGame.fen)
                const newFen = game.addMove(lastMove)
                const updatedGame = new Game(newFen)

                return services.localGame
                    .updateLocalGame({
                        id: this.currentGame.id,
                        newFen,
                        moves,
                        creator_captured_pieces:
                            this.currentGame.creator_captured_pieces,
                        guest_captured_pieces:
                            this.currentGame.guest_captured_pieces,
                    })
                    .then((newGame) => {
                        this.SET_CURRENT_GAME(newGame)
                        const boardStore = useBoardStore()
                        boardStore.initBoard({
                            opponentType: 'computer',
                            playerColor: newGame.creator_color,
                            hasToPlay: updatedGame.state.hasToPlay,
                            round: updatedGame.state.fullMoveClock,
                            fenBoard: updatedGame.state.fenBoard,
                            legalMoves: updatedGame.scan.legalMoves,
                            moves,
                            creator_captured_pieces:
                                newGame.creator_captured_pieces,
                            guest_captured_pieces:
                                newGame.guest_captured_pieces,
                        })
                        return newGame
                    })
            }
        },

        async getGames() {
            return services.localGame.getLocalGames().then((gameList) => {
                this.SET_GAME_LIST(gameList)

                return gameList
            })
        },

        async getGame(gameId: string) {
            return services.localGame.getLocalGame(gameId).then((game) => {
                console.log('🤖___computer_game___', game)
                const gameAnalysis = new Game(game.fen)

                this.SET_CURRENT_GAME(game)
                const boardStore = useBoardStore()
                boardStore.initBoard({
                    opponentType: 'computer',
                    playerColor: game.creator_color,
                    hasToPlay: gameAnalysis.state.hasToPlay,
                    round: gameAnalysis.state.fullMoveClock,
                    fenBoard: gameAnalysis.state.fenBoard,
                    legalMoves: gameAnalysis.scan.legalMoves,
                    moves: game.moves,
                    creator_captured_pieces: game.creator_captured_pieces,
                    guest_captured_pieces: game.guest_captured_pieces,
                })
                return game
            })
        },

        async deleteGame(gameId: string) {
            return services.localGame.deleteLocalGame(gameId).then((game) => {
                this.DELETE_GAME(game.id)
                this.RESET_CURRENT_GAME()
                return game
            })
        },

        SET_CURRENT_GAME(game: IComputerGame) {
            this.currentGame = game
        },

        SET_GAME_LIST(gameList: IComputerGame[]) {
            this.gameList = gameList
        },

        RESET_CURRENT_GAME() {
            this.currentGame = null
        },

        ADD_GAME(game: IComputerGame) {
            this.gameList = [...this.gameList, game]
        },

        DELETE_GAME(gameId: string) {
            this.gameList = this.gameList.filter((game) => game.id !== gameId)
        },
    },
})
