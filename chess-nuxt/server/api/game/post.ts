import { createGameInDB } from '../../db/game.service.ts'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // use zod for body validation ?

    return createGameInDB()
})

// export const createGame = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const game = await createGameInDB({
//             creator: getUserIdFromHeader(req.headers.authorization!),
//             guest: req.body.guest,
//             hasToPlay: req.body.hasToPlay,
//             moves: req.body.moves,
//         })
//         return res.status(201).json(game)
//     } catch (error: any) {
//         return next(error)
//     }
// }
