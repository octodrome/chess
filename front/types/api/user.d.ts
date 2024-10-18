import type { ApiGame } from './game'

export interface ApiUser {
    ID: number
    CreatedAt: Date
    UpdatedAt: Date
    DeletedAt: Date

    email: string
    password: string
    games_as_creator: ApiGame[]
    games_as_guest: ApiGame[]
}
