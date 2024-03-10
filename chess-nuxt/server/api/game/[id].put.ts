export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id')

    return `Hello, ${id}!`
})

// export const addMove = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const game = await findOneGameInDB(req.params.id)
//         if (isNotAllowedOnTheGame(game, req))
//             throw createError(400, error.notAllowedOnGame)
//         if (isWrongTurn(game, req)) throw createError(400, error.isWrongTurn)

//         // Adds the played move
//         const moves = game.moves
//         moves.push(req.body.move)
//         // Toggles hasToPlay to the next player
//         const hasToPlay =
//             game.hasToPlay === game.creator ? game.guest : game.creator
//         await updateOneGameInDB(req.params.id, { moves, hasToPlay })
//         return res.status(200).json({ message: 'Successfully played a move' })
//     } catch (error) {
//         return next(error)
//     }
// }
