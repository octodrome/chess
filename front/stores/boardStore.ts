// @ts-nocheck
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useComputerGameStore } from '~/stores/computerGameStore'
import FenBoardParser from '~/helpers/FenBoardParser'
import {
    getANCoords,
    getMoveFromAN,
    getNormalCoords,
} from '~/helpers/stockfish'
import services from '~/services/index'
import type { IPiece } from 'chess-legal-moves/dist/types'

export const useBoardStore = defineStore('board', {
    state: () => ({
        opponent: 'computer',
        playerColor: 'white',
        board: FenBoardParser('8/8/8/8/8/8/8/8'),
        hasToPlay: 'white',
        selectedPiece: null,
        round: 1,
        legalMoves: [],
        moves: [],
        moveStart: null,
        moveEnd: null,
        playerCapturedPieces: [] as IPiece[],
        computerCapturedPieces: [] as IPiece[],
    }),

    getters: {
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
        showPossibleMoves(cellPosition) {
            const fromInAN = getANCoords(cellPosition)
            const legalMovesFromHere = this.legalMoves.filter(
                (legalMove) => legalMove.from === fromInAN
            )

            if (legalMovesFromHere[0].quietMoves.length !== 0) {
                legalMovesFromHere[0].quietMoves.map((to) => {
                    const destination = getNormalCoords(to)
                    this.MARK_AS_POSSIBLE_DESTINATION({
                        columnIndex: destination.columnIndex,
                        rowIndex: destination.rowIndex,
                    })
                })
            }

            if (legalMovesFromHere[0].killMoves.length !== 0) {
                legalMovesFromHere[0].killMoves.map((to) => {
                    const destination = getNormalCoords(to)
                    this.MARK_AS_POSSIBLE_KILL({
                        columnIndex: destination.columnIndex,
                        rowIndex: destination.rowIndex,
                    })
                })
            }
        },

        selectOrigin(from) {
            this.UNSELECT_ALL_PIECES()
            this.HIDE_POSSIBLE_DESTINATIONS()
            this.HIDE_POSSIBLE_KILLS()
            if (
                this.hasToPlay ===
                this.board[from.columnIndex][from.rowIndex].piece.color
            ) {
                this.SELECT_PIECE(from)
                this.showPossibleMoves(from)
            }
        },

        move(moves) {
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
                this.REMOVE_PIECE_FROM(move.startPosition)
            }
        },

        selectDestination(endPosition) {
            this.move([
                { startPosition: this.selectedPiecePosition, endPosition },
            ])
            // CLEAR BOARD
            this.UNSELECT_ALL_PIECES()
            this.HIDE_POSSIBLE_DESTINATIONS()
            this.HIDE_POSSIBLE_KILLS()
            // PREPARE NEXT ROUND
            this.INCREMENT_ROUND()
            this.TOGGLE_PLAYER()
            const humanGameStore = useHumanGameStore()
            if (!humanGameStore.isAgainstHuman) this.sendMoveToComputer()
            if (humanGameStore.isAgainstHuman) this.sendMoveToPlayer()
        },

        sendMoveToComputer() {
            // @TODO🐛 when coming back on a computer game played before
            // after playing one move the computer plays on white side
            const computerGameStore = useComputerGameStore()
            computerGameStore.sendMoves(this.moves).then(() => {
                services.engine
                    .sendMove(this.movesAsString)
                    .then((move: string) => {
                        this.move(getMoveFromAN(move))
                        computerGameStore.sendMoves(this.moves)
                    })
            })
        },

        sendMoveToPlayer() {
            // @TODO use it
            services.game.sendMove(this.movesAsString).then((move) => {
                this.move(getMoveFromAN(move))
                this.INCREMENT_ROUND
                this.TOGGLE_PLAYER
            })
        },

        setPlayerColor(color: string) {
            // @TODO use it with computer games
            this.SET_PLAYER_COLOR(color)
        },

        // @TODO use initBoard instead
        startNewGame(opponentType) {
            this.SET_OPPONENT_TYPE(opponentType)
            this.RESET_GAME()
        },

        // @TODO use initBoard instead
        continueGame(opponentType) {
            this.SET_OPPONENT_TYPE(opponentType)
        },

        initBoard({
            opponentType,
            playerColor,
            hasToPlay,
            round,
            fenBoard,
            legalMoves,
            moves,
        }) {
            this.SET_OPPONENT_TYPE(opponentType)
            this.SET_PLAYER_COLOR(playerColor)
            this.SET_HAS_TO_PLAY(hasToPlay)
            this.SET_ROUND(round)
            this.SET_BOARD(fenBoard)
            this.SET_LEGAL_MOVES(legalMoves)
            this.moves = moves
        },

        initEmptyBoard() {
            this.RESET_GAME()
        },

        UNSELECT_ALL_PIECES() {
            for (const row in this.board) {
                for (const column in this.board[row]) {
                    if (this.board[row][column].piece !== null) {
                        this.board[row][column].piece.selected = false
                    }
                }
            }
        },

        MARK_AS_POSSIBLE_DESTINATION(cellPosition) {
            this.board[cellPosition.columnIndex][
                cellPosition.rowIndex
            ].possibleDestination = true
        },

        HIDE_POSSIBLE_DESTINATIONS() {
            for (const row in this.board) {
                for (const column in this.board[row]) {
                    this.board[row][column].possibleDestination = false
                }
            }
        },

        MARK_AS_POSSIBLE_KILL(cellPosition) {
            this.board[cellPosition.columnIndex][
                cellPosition.rowIndex
            ].possibleKill = true
        },

        HIDE_POSSIBLE_KILLS() {
            for (const row in this.board) {
                for (const column in this.board[row]) {
                    this.board[row][column].possibleKill = false
                }
            }
        },

        SELECT_PIECE(cellPosition) {
            this.board[cellPosition.columnIndex][
                cellPosition.rowIndex
            ].piece.selected = true
            this.selectedPiece =
                this.board[cellPosition.columnIndex][
                    cellPosition.rowIndex
                ].piece
        },

        ADD_PIECE(path) {
            if (
                this.board[path.to.columnIndex][path.to.rowIndex].piece !== null
            ) {
                if (this.hasToPlay === 'white') {
                    this.playerCapturedPieces.push(
                        this.board[path.to.columnIndex][path.to.rowIndex].piece
                    )
                }

                if (this.hasToPlay === 'black') {
                    this.computerCapturedPieces.push(
                        this.board[path.to.columnIndex][path.to.rowIndex].piece
                    )
                }
            }
            this.board[path.to.columnIndex][path.to.rowIndex].piece =
                this.board[path.from.columnIndex][path.from.rowIndex].piece
        },

        REMOVE_PIECE_FROM(cellPosition) {
            this.board[cellPosition.columnIndex][cellPosition.rowIndex].piece =
                null
        },

        TOGGLE_PLAYER() {
            this.hasToPlay = this.hasToPlay === 'white' ? 'black' : 'white'
        },

        INCREMENT_ROUND() {
            this.round++
        },

        SET_ROUND(round: number) {
            this.round = round
        },

        SET_PLAYER_COLOR(color: string) {
            this.playerColor = color
        },

        ADD_MOVE(move) {
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

        SET_OPPONENT_TYPE(opponentType) {
            this.opponent = opponentType
        },

        SET_HAS_TO_PLAY(hasToPlay: 'w' | 'b') {
            this.hasToPlay = hasToPlay === 'w' ? 'white' : 'black'
        },

        SET_BOARD(fenBoard: string) {
            this.board = FenBoardParser(fenBoard)
        },

        SET_LEGAL_MOVES(legalMoves: string[]) {
            this.legalMoves = legalMoves
        },
    },
})
