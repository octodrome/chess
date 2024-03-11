import { findOneGameInDB, updateOneGameInDB } from '../../db/game.service'
import { isNotAllowedOnTheGame, isWrongTurn } from '../../utils/utils'

export default defineEventHandler(async (event) => {
    console.log('PUT api/game/:id')
    const id = getRouterParam(event, 'id')
    const headers = getRequestHeaders(event)
    const body = await readBody(event)

    try {
        const game = await findOneGameInDB(id)

        if (isNotAllowedOnTheGame(game, headers)) {
            event.node.res.statusCode = 400
            return {
                code: 'ERROR',
                message: 'User not allowed on this game',
            }
        }

        if (isWrongTurn(game, headers)) {
            event.node.res.statusCode = 400
            return {
                code: 'ERROR',
                message: 'User not allowed on this turn',
            }
        }

        // Adds the played move
        const moves = game.moves
        moves.push(body.move)
        // Toggles hasToPlay to the next player
        const hasToPlay =
            game.hasToPlay === game.creator ? game.guest : game.creator
        const updatedGame = await updateOneGameInDB(id, { moves, hasToPlay })
        return updatedGame
    } catch (error) {
        console.error(error)
        event.node.res.statusCode = 500
        return {
            code: 'ERROR',
            message: 'Something went wrong.',
        }
    }
})
