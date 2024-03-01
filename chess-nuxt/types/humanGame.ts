import type { IUser } from './user'

export interface IHumanGameState {
    gameList: IGame[]
    currentGame: IGame | null
}

export interface IHumanGame {
    creator: IUser
    guest: IUser
    hasToPlay: IUser
    moves: string[]
    createdAt: Date
    messages: IMessage[]
    _id: string
}

export interface ICreateHumanGameRequestParams {
    guest: string
    hasToPlay: string
    moves: string[]
}

export interface IUpdateHumanGameRequestParams {
    gameId: string
    moves: string[]
}

export interface IMessage {
    from: string
    content: string
}
