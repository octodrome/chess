import { findOneGameInDB, updateOneGameInDB } from '../../../db/game.service'
import { isNotAllowedOnTheGame, isWrongTurn } from '../../../utils/utils'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const headers = getRequestHeaders(event)
    const body = await readBody(event)

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Game id was not provided',
        })
    }

    const game = await findOneGameInDB(id)

    if (isNotAllowedOnTheGame(game, headers)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User not allowed on this game',
        })
    }

    if (isWrongTurn(game, headers)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User not allowed on this turn',
        })
    }

    if (!game) {
        throw createError({
            statusCode: 404,
            statusMessage: 'This game does not exist',
        })
    }

    // Adds the played move
    const moves = game.moves
    moves.push(body.move)
    // Toggles hasToPlay to the next player
    const hasToPlay =
        game.hasToPlay === game.creator ? game.guest : game.creator
    const updatedGame = await updateOneGameInDB(id, { moves, hasToPlay })
    return updatedGame
})
