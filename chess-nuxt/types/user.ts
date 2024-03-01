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
    user: IUser
    token: string
}

export interface IUser {
    email: string
    createdAt: Date
    _id: string
}

export interface ICreateGameRequestParams {}

export interface ISendMoveRequestParams {}
