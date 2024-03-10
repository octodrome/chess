// export const getOneUser = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const user = await findOneUserByIDInDB(req.params.id)
//         return res.status(200).json(user)
//     } catch (error) {
//         return next(error)
//     }
// }
