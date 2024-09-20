import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import type { ApiGame } from '../models/game.model'
import type { HTTPHeaderName } from 'h3'
const config = useRuntimeConfig()

declare module 'jsonwebtoken' {
    export interface JwtPayload {
        userId: string
    }
}

export const isNotAllowedOnTheGame = (
    game: ApiGame,
    headers: Partial<Record<HTTPHeaderName, string | undefined>>
): boolean => {
    const isNotCreator =
        game.creator !== getUserIdFromHeader(headers.authorization!)
    const isNotGuest =
        game.guest !== getUserIdFromHeader(headers.authorization!)

    return isNotCreator && isNotGuest
}

export const isWrongTurn = (
    game: ApiGame,
    headers: Partial<Record<HTTPHeaderName, string | undefined>>
): boolean => {
    return game.hasToPlay !== getUserIdFromHeader(headers.authorization!)
}

export function getUserIdFromHeader(authorizationHeader: string): string {
    const token = authorizationHeader.split(' ')[1]
    const decodeToken = jwt.verify(
        token,
        config.jwtSecret as string
    ) as JwtPayload
    const userId = decodeToken.userId
    return userId
}
