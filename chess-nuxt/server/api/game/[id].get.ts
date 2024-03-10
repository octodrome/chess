// export const getOneGame = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const game = await findOneGameInDB(req.params.id)
//         return res.status(200).json(game)
//     } catch (error) {
//         return next(error)
//     }
// }
