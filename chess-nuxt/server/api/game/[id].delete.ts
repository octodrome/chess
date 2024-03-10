// export const deleteGame = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         await removeGameFromDB(req.params.id)
//         return res.status(200).json({ message: 'Game successfully deleted' })
//     } catch (error) {
//         return next(error)
//     }
// }
