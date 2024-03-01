import type {
    ILoginUserRequestParams,
    ISignupUserRequestParams,
    ILoginUserResponse,
    IUser,
} from '~/types/user'
import { HTTP } from './axios-config'

export default class User {
    async getAllOpponents(userId: string): Promise<IUser[]> {
        return (await HTTP.get(`user?except=${userId}`)).data
    }

    async getUser(userId: string): Promise<IUser> {
        return (await HTTP.get(`user/${userId}`)).data
    }

    async signup(params: ISignupUserRequestParams): Promise<IUser> {
        return (await HTTP.post('user/signup', params)).data
    }

    async login(params: ILoginUserRequestParams): Promise<ILoginUserResponse> {
        return (await HTTP.post('user/login', params)).data
    }
}
