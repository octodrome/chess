type IGame = any

export interface IComputerGameState {
    gameList: IGame[]
    currentGame: IGame | null
}

export type IColor = 'white' | 'black'

export interface ICreateComputerGameParams {
    playerColor: IColor
    opponentColor: IColor
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
    created_at: Date
    updated_at: Date

    guest_name: string
    creator_color: IColor
    guest_color: IColor
    guest_level: number
    fen: string
    moves: string[]
    creator_captured_pieces: any[]
    guest_captured_pieces: any[]
}
