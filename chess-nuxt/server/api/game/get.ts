// export const getAllGames = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         let gameList
//         if (req.query.user) {
//             gameList = await findAllGamesFromUserInDB(req.query.user as string)
//         } else {
//             gameList = await findAllGamesInDB()
//         }
//         return res.status(200).json(gameList)
//     } catch (error) {
//         return next(error)
//     }
// }
