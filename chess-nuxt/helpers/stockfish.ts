import type { ICellPosition, IMove } from '~/types/board'

// Converts a board position into an algebric notation position
export function getANCoords(cellPosition: ICellPosition): string {
    const file: string = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][
        cellPosition.columnIndex
    ]
    const rank: string = (cellPosition.rowIndex + 1).toString()

    return file + rank
}

// Converts an algebric notation position into a board position
export function getNormalCoords(anCoords: string): ICellPosition {
    const columnIndex = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].indexOf(
        anCoords[0]
    )
    const rowIndex = parseInt(anCoords[1]) - 1

    return {
        columnIndex,
        rowIndex,
    }
}

// Converts an algebric notation move into an IMove
export function getMoveFromAN(anMove: string) {
    const castlingMoves: { [index: string]: string } = {
        e8g8: 'h8f8',
        e8c8: 'a8d8',
        e1g1: 'h1f1',
        e1c1: 'a1d1',
    }
    const isCastlingMove = () => anMove in castlingMoves

    return isCastlingMove() ? handleCastlingMove(anMove) : handleNormalMove()

    function handleCastlingMove(anKingMove: string): IMove[] {
        const kingMove = {
            startPosition: getNormalCoords(anKingMove.substr(0, 2)),
            endPosition: getNormalCoords(anKingMove.substr(2, 2)),
        }
        const rookMove = {
            startPosition: getNormalCoords(
                castlingMoves[anKingMove].substr(0, 2)
            ),
            endPosition: getNormalCoords(
                castlingMoves[anKingMove].substr(2, 2)
            ),
        }
        return [kingMove, rookMove]
    }

    function handleNormalMove() {
        const move = {
            startPosition: getNormalCoords(anMove.substr(0, 2)),
            endPosition: getNormalCoords(anMove.substr(2, 2)),
        }
        return [move]
    }
}
