import createError from 'http-errors'
import Game from '../models/game.model'
import { IGame } from '../../types'

export const createGameInDB = async (createGameBody: IGame): Promise<IGame> => {
    try {
        const game = new Game(createGameBody)
        await game.save()
        await game.populate(['creator', 'guest'])
        return game
    } catch {
        throw createError(500, 'Error while creating the game in DB')
    }
}

export const findAllGamesInDB = async () => {
    try {
        const games = await Game.find().populate(['creator', 'guest'])
        return games
    } catch (error) {
        throw createError(500, 'Error while finding all the games in DB')
    }
}

export const findAllGamesFromUserInDB = async (userId: string) => {
    try {
        const userGames = await Game.find({
            $or: [{ creator: userId }, { guest: userId }],
        }).populate(['creator', 'guest'])
        return userGames
    } catch (error) {
        throw createError(500, 'Error while finding user games in DB')
    }
}

export const findOneGameInDB = async (id: string) => {
    try {
        const game = await Game.findOne({ _id: id }).populate([
            'creator',
            'guest',
        ])
        return game
    } catch (error) {
        throw createError(500, 'Error while finding this game in DB')
    }
}

export const updateOneGameInDB = async (
    id: string,
    newGame: Partial<IGame>
) => {
    try {
        const game = await Game.findOneAndUpdate({ _id: id }, newGame, {
            new: true,
        })
        return game
    } catch (error) {
        throw createError(500, 'Error while updating this game in DB')
    }
}

export const removeGameFromDB = async (id: string) => {
    try {
        const games = await Game.deleteOne({ _id: id })
        return games
    } catch (error) {
        throw createError(500, 'Error while removing the game from DB')
    }
}
