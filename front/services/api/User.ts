import type { ApiUser } from '~/types/api/user'
import type {
    ILoginUserRequestParams,
    ISignupUserRequestParams,
    ILoginUserResponse,
    IUpdateUserRequestParams,
} from '~/types/user'

export default class User {
    async getAllOpponents(userId: string) {
        return await useCustomFetch<{ data: ApiUser[] }>('api/user', {
            query: { except: userId },
        })
    }

    async getUser(userId: string) {
        return await useCustomFetch<{ data: ApiUser }>(`api/user/${userId}`)
    }

    async updateUser(userId: string, newUser: IUpdateUserRequestParams) {
        return await useCustomFetch<{ data: ApiUser }>(`api/user/${userId}`, {
            method: 'put',
            body: newUser,
        })
    }

    async signup(params: ISignupUserRequestParams) {
        return await useCustomFetch<{ data: ApiUser }>('auth/register', {
            method: 'post',
            body: params,
        })
    }

    async login(params: ILoginUserRequestParams) {
        return await useCustomFetch<ILoginUserResponse>('auth/login', {
            method: 'post',
            body: params,
        })
    }
}
