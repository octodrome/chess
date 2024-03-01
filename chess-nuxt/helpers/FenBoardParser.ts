import type { ICell, IPiece } from '~/types/board'

export default function FenBoardParser(fenBoard: string): ICell[][] {
    let boardArray = fenBoard.split('/')
    boardArray = boardArray.map((rank) => {
        for (let i = 1; i <= 8; i++) {
            rank = rank.replaceAll(i.toString(), '.'.repeat(i))
        }

        return rank
    })
    return boardFeeder(adaptToAnCoords(boardArray))
}

// boardFeeder()
// Fill the Algebric Notation data structure with cell data
function boardFeeder(anCoordsBoard: string[][]): ICell[][] {
    const parsedBoard: ICell[][] = []

    for (const [columnIndex, columnValue] of anCoordsBoard.entries()) {
        const column: ICell[] = []
        for (const [rowIndex, rowValue] of columnValue.entries()) {
            const cell: ICell = {
                anCoords: getPositionName(columnIndex, rowIndex),
                piece: rowValue === '.' ? null : getPiece(rowValue),
                color: getCellColor(columnIndex, rowIndex),
                possibleDestination: false,
                possibleKill: false,
            }
            column.push(cell)
        }
        parsedBoard.push(column)
    }

    return parsedBoard
}

function getPositionName(columnIndex: number, rowIndex: number) {
    const columnName = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][columnIndex]
    const rowName = (rowIndex + 1).toString()

    return columnName + rowName
}

function getCellColor(columnIndex: number, rowIndex: number): string {
    return (columnIndex + rowIndex) % 2 === 0 ? 'black' : 'white'
}

// adaptToAnCoords() :
// Adapt board snapshot data structure (array of strings) to
// chess Alebric Notation (letter column / number row / from bottom-left of chessboard)
function adaptToAnCoords(boardSnapShot: string[]): string[][] {
    const anCoordsBoard: string[][] = []

    for (let lineIndex = 0; lineIndex < 8; lineIndex++) {
        const row: string[] = []
        for (let characterIndex = 7; characterIndex >= 0; characterIndex--) {
            row.push(boardSnapShot[characterIndex][lineIndex])
        }
        anCoordsBoard.push(row)
    }

    return anCoordsBoard
}

function getPieceColor(pieceCharacter: string): string {
    return pieceCharacter == pieceCharacter.toUpperCase() ? 'white' : 'black'
}

function getPieceType(pieceCharacter: string): string {
    switch (pieceCharacter.toLowerCase()) {
        case 'r':
            return 'rook'
        case 'n':
            return 'knight'
        case 'b':
            return 'bishop'
        case 'q':
            return 'queen'
        case 'k':
            return 'king'
        case 'p':
            return 'pawn'
        default:
            return 'error'
    }
}

function getPiece(pieceCharacter: string): IPiece {
    return {
        color: getPieceColor(pieceCharacter),
        type: getPieceType(pieceCharacter),
        selected: false,
    }
}
