// export const deleteUser = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         await removeUserFromDB(req.params.id)
//         return res.status(200).json({ message: 'User successfully deleted' })
//     } catch (error) {
//         return next(error)
//     }
// }
