// export const getAllUsers = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         let userList
//         if (req.query.except) {
//             userList = await findAllOpponentsInDB(req.query.except as string)
//         } else {
//             userList = await findAllUsersInDB()
//         }
//         return res.status(200).json(userList)
//     } catch (error) {
//         return next(error)
//     }
// }
