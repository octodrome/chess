import type { ApiUser } from './api/user'

export interface IUserState {
    user: IUser | null
    users: IUser[]
}

export interface ISignupUserRequestParams {
    email: string
    password: string
}

export interface ISignupUserResponse {
    email: string
    token: string
}

export interface ILoginUserRequestParams {
    email: string
    password: string
}

export interface ILoginUserResponse {
    user: ApiUser
    token: string
}

export interface IUpdateUserRequestParams {
    pseudo: string
    about: string
}

export interface IUser {
    email: string
    createdAt: Date
    id: string
}

export interface ICreateGameRequestParams {}

export interface ISendMoveRequestParams {}
