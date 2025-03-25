import type { ApiGame } from './game'

export interface ApiMessage {
    id: number
    created_at: Date
    updated_at: Date
    deleted_at: Date

    game_id: number
    game: ApiGame
    from_id: number
    to_id: number
    content: string
}
