import { useHumanGameStore } from '~/stores/humanGameStore'
import { useComputerGameStore } from '~/stores/computerGameStore'
import FenBoardParser from '~/helpers/FenBoardParser'
import {
    getANCoords,
    getMoveFromAN,
    getNormalCoords,
} from '~/helpers/stockfish'
import services from '~/services/index'
import type { ICellPosition, IMove, IPiece } from '~/types/board'
import type { ILegalMoves } from 'chess-legal-moves/dist/types'

export const useBoardStore = defineStore('board', {
    state: () => ({
        opponent: 'computer',
        playerColor: 'white',
        board: FenBoardParser('8/8/8/8/8/8/8/8'),
        hasToPlay: 'white',
        selectedPiece: null as IPiece | null,
        round: 1,
        legalMoves: [] as ILegalMoves,
        moves: [] as string[],
        moveStart: '',
        moveEnd: '',
        playerCapturedPieces: [] as IPiece[],
        computerCapturedPieces: [] as IPiece[],
    }),

    getters: {
        movesByRound: (state) => {
            const res: string[] = []

            let i = 0
            let j = 1
            while (j <= state.moves.length) {
                res.push(`${state.moves[i]} ${state.moves[j] || ''}`)
                i += 2
                j += 2
            }

            return res
        },

        playerHasToPlay: (state) => state.playerColor === state.hasToPlay,

        selectedPiecePosition: (state) => {
            for (const column in state.board) {
                for (const row in state.board[column]) {
                    if (
                        state.board[column][row].piece !== null &&
                        state.board[column][row].piece?.selected === true
                    ) {
                        return {
                            columnIndex: parseInt(column),
                            rowIndex: parseInt(row),
                        }
                    }
                }
            }
        },

        movesAsString: (state) => {
            let movesString = ''
            for (let i = 0; i < state.moves.length; i++) {
                movesString += state.moves[i] + ' '
            }

            return movesString
        },

        // @TODO get king state from lib
        isPlayerKingChecked: () => false,

        // @TODO get king state from lib
        isOpponentKingChecked: () => false,
    },

    actions: {
        showPossibleMoves(cellPosition: ICellPosition) {
            const fromInAN = getANCoords(cellPosition)
            const legalMovesFromHere = this.legalMoves.filter(
                (legalMove) => legalMove.from === fromInAN
            )

            if (legalMovesFromHere[0].quietMoves.length !== 0) {
                legalMovesFromHere[0].quietMoves.map((to) => {
                    const destination = getNormalCoords(to)
                    this.board[destination.columnIndex][
                        destination.rowIndex
                    ].possibleDestination = true
                })
            }

            if (legalMovesFromHere[0].killMoves.length !== 0) {
                legalMovesFromHere[0].killMoves.map((to) => {
                    const destination = getNormalCoords(to)
                    this.board[destination.columnIndex][
                        destination.rowIndex
                    ].possibleKill = true
                })
            }
        },

        selectOrigin(from: ICellPosition) {
            if (this.playerHasToPlay) {
                this.UNSELECT_ALL_PIECES()
                this.HIDE_POSSIBLE_DESTINATIONS()
                this.HIDE_POSSIBLE_KILLS()
                if (
                    this.hasToPlay ===
                    this.board[from.columnIndex][from.rowIndex].piece?.color
                ) {
                    this.SELECT_PIECE(from)
                    this.showPossibleMoves(from)
                }
            }
        },

        move(moves: IMove[]) {
            // Takes moves as an array to be able to handle two moves at the same time for stockfish castling
            for (const move of moves) {
                this.ADD_MOVE({
                    startPosition: move.startPosition,
                    endPosition: move.endPosition,
                })
                this.ADD_PIECE({
                    from: move.startPosition,
                    to: move.endPosition,
                })
                this.board[move.startPosition.columnIndex][
                    move.startPosition.rowIndex
                ].piece = null
            }
        },

        selectDestination(endPosition: ICellPosition) {
            this.move([
                {
                    startPosition: this.selectedPiecePosition as ICellPosition,
                    endPosition,
                },
            ])
            // CLEAR BOARD
            this.UNSELECT_ALL_PIECES()
            this.HIDE_POSSIBLE_DESTINATIONS()
            this.HIDE_POSSIBLE_KILLS()
            // PREPARE NEXT ROUND
            this.round++
            this.TOGGLE_PLAYER()
            const humanGameStore = useHumanGameStore()
            if (!humanGameStore.isAgainstHuman) this.sendMoveToComputer()
            if (humanGameStore.isAgainstHuman) this.sendMoveToPlayer()
        },

        sendMoveToComputer() {
            // @TODO🐛 when coming back on a computer game played before
            // after playing one move the computer plays on white side
            const computerGameStore = useComputerGameStore()
            computerGameStore.sendMoves(this.moves)?.then(() => {
                services.engine
                    .sendMove(this.movesAsString)
                    .then((move: string) => {
                        this.move(getMoveFromAN(move))
                        computerGameStore.sendMoves(this.moves)
                    })
            })
        },

        computerBegins() {
            const computerGameStore = useComputerGameStore()

            services.engine
                .sendMove(this.movesAsString)
                .then((move: string) => {
                    this.move(getMoveFromAN(move))
                    computerGameStore.sendMoves(this.moves)
                })
        },

        sendMoveToPlayer() {
            // @TODO use it
            // services.game.sendMove(this.movesAsString).then((move) => {
            //     this.move(getMoveFromAN(move))
            //     this.round++
            //     this.TOGGLE_PLAYER
            // })
        },

        startNewGame(opponentType: string) {
            // @TODO use initBoard instead
            this.opponent = opponentType
            this.RESET_GAME()
        },

        continueGame(opponentType: string) {
            // @TODO use initBoard instead
            this.opponent = opponentType
        },

        initBoard({
            opponentType,
            playerColor,
            hasToPlay,
            round,
            fenBoard,
            legalMoves,
            moves,
            creator_captured_pieces,
            guest_captured_pieces,
        }: {
            opponentType: string
            playerColor: string
            hasToPlay: string
            round: number
            fenBoard: string
            legalMoves: ILegalMoves
            moves: string[]
            creator_captured_pieces: IPiece[]
            guest_captured_pieces: IPiece[]
        }) {
            this.opponent = opponentType
            this.playerColor = playerColor
            this.hasToPlay = hasToPlay === 'w' ? 'white' : 'black'
            this.round = round
            this.board = FenBoardParser(fenBoard)
            this.legalMoves = legalMoves
            this.playerCapturedPieces = creator_captured_pieces
            this.computerCapturedPieces = guest_captured_pieces
            this.moves = moves
        },

        initEmptyBoard() {
            this.RESET_GAME()
        },

        UNSELECT_ALL_PIECES() {
            for (const row in this.board) {
                for (const column in this.board[row]) {
                    if (this.board[row][column].piece !== null) {
                        this.board[row][column].piece!.selected = false
                    }
                }
            }
        },

        HIDE_POSSIBLE_DESTINATIONS() {
            for (const row in this.board) {
                for (const column in this.board[row]) {
                    this.board[row][column].possibleDestination = false
                }
            }
        },

        HIDE_POSSIBLE_KILLS() {
            for (const row in this.board) {
                for (const column in this.board[row]) {
                    this.board[row][column].possibleKill = false
                }
            }
        },

        SELECT_PIECE(cellPosition: ICellPosition) {
            this.board[cellPosition.columnIndex][
                cellPosition.rowIndex
            ].piece!.selected = true

            this.selectedPiece =
                this.board[cellPosition.columnIndex][
                    cellPosition.rowIndex
                ].piece
        },

        ADD_PIECE(path: { from: ICellPosition; to: ICellPosition }) {
            if (
                this.board[path.to.columnIndex][path.to.rowIndex].piece !== null
            ) {
                if (this.hasToPlay === 'white') {
                    this.playerCapturedPieces.push(
                        this.board[path.to.columnIndex][path.to.rowIndex].piece!
                    )
                }

                if (this.hasToPlay === 'black') {
                    this.computerCapturedPieces.push(
                        this.board[path.to.columnIndex][path.to.rowIndex].piece!
                    )
                }
            }
            this.board[path.to.columnIndex][path.to.rowIndex].piece =
                this.board[path.from.columnIndex][path.from.rowIndex].piece
        },

        TOGGLE_PLAYER() {
            this.hasToPlay = this.hasToPlay === 'white' ? 'black' : 'white'
        },

        ADD_MOVE(move: IMove) {
            this.moveStart = getANCoords(move.startPosition)
            this.moveEnd = getANCoords(move.endPosition)
            if (this.moveStart && this.moveEnd) {
                this.moves.push(this.moveStart + this.moveEnd)
            }
        },

        RESET_GAME() {
            this.board = FenBoardParser('8/8/8/8/8/8/8/8')
            this.moves = []
            this.round = 1
            this.playerCapturedPieces = []
            this.computerCapturedPieces = []
        },
    },
})
