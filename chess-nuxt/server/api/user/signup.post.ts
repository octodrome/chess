// export const signup = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         await createUserInDB({
//             email: req.body.email,
//             password: hashedPassword,
//         })
//         return res.status(201).json({ message: 'User successfully created' })
//     } catch (error) {
//         return next(error)
//     }
// }
