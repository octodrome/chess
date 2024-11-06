type IGame = any

export interface IComputerGameState {
    gameList: IGame[]
    currentGame: IGame | null
}

export type IColor = 'white' | 'black'

export interface ICreateComputerGameParams {
    playerColor: IColor
    computerLevel: number
}

export interface IUpdateComputerGameParams {
    id: string
    newFen: string
    moves: string[]
    creator_captured_pieces: any[]
    guest_captured_pieces: any[]
}

export interface IComputerGame {
    id: string
    computerName: string
    createdAt: Date
    updatedAt: Date
    playerColor: IColor
    computerLevel: number
    fen: string
    moves: string[]
    creator_captured_pieces: any[]
    guest_captured_pieces: any[]
}
