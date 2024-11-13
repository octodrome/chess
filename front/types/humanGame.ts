import type { ApiGame } from './api/game'
import type { IColor } from './computerGame'
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
    created_at: Date
    messages: IMessage[]
    id: string
}

export interface ICreateHumanGameRequestParams {
    creator_id: number
    creator_color: IColor
    guest_id: number
    has_to_play_id: number
    moves: string
    fen: string
}

export interface IUpdateHumanGameRequestParams {
    gameId: string
    moves: string[]
}

export interface IMessage {
    id?: number
    created_at?: Date
    token: string
    game_id: number
    to_id: number
    from_id: number
    content: string
}
