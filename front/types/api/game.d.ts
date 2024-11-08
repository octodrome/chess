import type { ApiUser } from './user'
import type { IMessage } from '~/types/humanGame'

export interface ApiGame {
    id: number
    created_at: Date
    updated_at: Date
    deleted_at: Date

    creator_id: number
    creator: ApiUser
    creator_captured_pieces: string
    guest_id: number
    guest: ApiUser
    guest_captured_pieces: string
    has_to_play_id: number
    moves: string
    messages: IMessage[]
    fen: string
}
