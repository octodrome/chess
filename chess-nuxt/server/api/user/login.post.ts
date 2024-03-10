// export const login = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const user = await findOneUserByEmailInDB(req.body.email)
//         if (!user) throw createError(404, 'User not found')
//         const validation = await bcrypt.compare(
//             req.body.password,
//             user.password
//         )
//         if (!validation) throw createError(400, 'Wrong password')

//         return res.status(200).json({
//             user: {
//                 _id: user._id,
//                 email: user.email,
//             },
//             token: jwt.sign({ userId: user._id }, config.jwtSecret as string, {
//                 expiresIn: '24h',
//             }),
//         })
//     } catch (error) {
//         return next(error)
//     }
// }
