import type { ApiGame } from './game'

export interface ApiUser {
    id: number
    created_at: Date
    updated_at: Date
    deleted_at: Date

    email: string
    password: string
    games_as_creator: ApiGame[]
    games_as_guest: ApiGame[]
    pseudo: string
    about: string
}
