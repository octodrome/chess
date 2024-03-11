// import { Request, Response, NextFunction } from 'express'
// import getUserIdFromHeader from '../api/utils/getUserIdFromHeader'
// import config from '../../config'
// import jwt, { JwtPayload } from 'jsonwebtoken'

// declare module 'jsonwebtoken' {
//     export interface JwtPayload {
//         userId: string
//     }
// }

// export default function (req: Request, res: Response, next: NextFunction) {
//     try {
//         if (req.headers.authorization) {
//             const userId = getUserIdFromHeader(req.headers.authorization)
//             if (req.body.userId && req.body.userId !== userId) {
//                 throw 'User id is not valid'
//             } else {
//                 next()
//             }
//         } else {
//             throw 'Authorization header is missing'
//         }
//     } catch (error) {
//         res.status(401).json({ error })
//     }
// }

// function getUserIdFromHeader(authorizationHeader: string): string {
//     const token = authorizationHeader.split(' ')[1]
//     const decodeToken = jwt.verify(
//         token,
//         config.jwtSecret as string
//     ) as JwtPayload
//     const userId = decodeToken.userId
//     return userId
// }

// @TODO add log for http verb and url for each request
export default defineEventHandler((event) => {
    // const headers = getRequestHeaders(event)
    // console.log('Headers: ', headers)
})
