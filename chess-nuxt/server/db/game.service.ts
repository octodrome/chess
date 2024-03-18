import { createError } from '#imports'
import Game, { type ApiGame } from '../models/game.model'
import type { ICreateHumanGameRequestParams } from '~/types/humanGame'

export const createGameInDB = async (
    createGameBody: ICreateHumanGameRequestParams
) => {
    try {
        const game = new Game(createGameBody)
        await game.save()
        await game.populate(['creator', 'guest'])
        return game as unknown as ApiGame
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while creating the game in DB',
        })
    }
}

export const findAllGamesInDB = async () => {
    try {
        const games = await Game.find().populate(['creator', 'guest'])
        return games as unknown as ApiGame[]
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while finding all the games in DB',
        })
    }
}

export const findAllGamesFromUserInDB = async (userId: string) => {
    try {
        const userGames = await Game.find({
            $or: [{ creator: userId }, { guest: userId }],
        }).populate(['creator', 'guest'])
        return userGames as unknown as ApiGame[]
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while finding user games in DB',
        })
    }
}

export const findOneGameInDB = async (id: string) => {
    try {
        const game = await Game.findOne({ _id: id }).populate([
            'creator',
            'guest',
        ])
        return game as unknown as ApiGame
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while finding this game in DB',
        })
    }
}

export const updateOneGameInDB = async (
    id: string,
    newGame: Partial<ApiGame>
) => {
    try {
        const game = await Game.findOneAndUpdate({ _id: id }, newGame, {
            new: true,
        })
        return game as unknown as ApiGame
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while updating this game in DB',
        })
    }
}

export const removeGameFromDB = async (id: string) => {
    try {
        const games = await Game.deleteOne({ _id: id })
        return games as unknown as ApiGame[]
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while removing the game from DB',
        })
    }
}
