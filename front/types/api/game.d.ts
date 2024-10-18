import type { ApiUser } from './user'

export interface ApiGame {
    ID: number
    CreatedAt: Date
    UpdatedAt: Date
    DeletedAt: Date

    creator_id: number
    creator: ApiUser
    guest_id: number
    guest: ApiUser
    has_to_play_id: number
    moves: string
    messages: ApiMessage[]
}
