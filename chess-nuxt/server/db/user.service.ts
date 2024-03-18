import { createError } from '#imports'
import User, { type ApiUser } from '../models/user.model'
import type { ISignupUserRequestParams } from '~/types/user'

export const createUserInDB = async (
    createUserBody: ISignupUserRequestParams
) => {
    try {
        const user = new User(createUserBody)
        await user.save()
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while creating the user in DB',
        })
    }
}

export const findAllUsersInDB = async () => {
    try {
        const users = await User.find()
        return users as ApiUser[]
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while finding all the users in DB',
        })
    }
}

export const findAllOpponentsInDB = async (userId: string) => {
    try {
        const users = await User.find({ _id: { $ne: userId } })
        return users as ApiUser[]
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while finding all the opponents in DB',
        })
    }
}

// TODO: Use only one function to find a user
export const findOneUserByIDInDB = async (id: string) => {
    try {
        const user = await User.findOne({ _id: id })
        return user as ApiUser
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while finding this user in DB',
        })
    }
}
export const findOneUserByEmailInDB = async (email: string) => {
    try {
        const user = await User.findOne({ email })
        return user as ApiUser
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while finding this user in DB',
        })
    }
}

export const removeUserFromDB = async (id: string) => {
    try {
        const users = await User.deleteOne({ _id: id })
        return users
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error while removing the user from DB',
        })
    }
}
