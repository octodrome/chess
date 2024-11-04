import type { ApiGame } from './api/game'
import type { IUser } from './user'

export interface IHumanGameState {
    gameList: ApiGame[]
    currentGame: ApiGame | null
}

export interface IHumanGame {
    creator: IUser
    guest: IUser
    hasToPlay: IUser
    moves: string[]
    createdAt: Date
    messages: IMessage[]
    ID: string
}

export interface ICreateHumanGameRequestParams {
    creator_id: number
    guest_id: number
    has_to_play_id: number
    moves: string
}

export interface IUpdateHumanGameRequestParams {
    gameId: string
    moves: string[]
}

export interface IMessage {
    ID?: number
    CreatedAt?: Date
    token: string
    game_id: number
    to_id: number
    from_id: number
    content: string
}
