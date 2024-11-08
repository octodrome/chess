import type { ApiUser } from './user'
import type { IMessage } from '~/types/humanGame'

export interface ApiGame {
    id: number
    created_at: Date
    updated_at: Date
    deleted_at: Date

    creator_id: number
    creator: ApiUser
    guest_id: number
    guest: ApiUser
    has_to_play_id: number
    moves: string
    messages: IMessage[]
}
