import type { ApiUser } from '~/types/api/user'
import type {
    ILoginUserRequestParams,
    ISignupUserRequestParams,
    ILoginUserResponse,
    IUpdateUserRequestParams,
} from '~/types/user'

export default class User {
    async getAllOpponents(userId: string) {
        return (
            await useCustomFetch('api/user', {
                query: { except: userId },
            })
        ).data.value as Promise<{ data: ApiUser[] }>
    }

    async getUser(userId: string) {
        const { data } = await useCustomFetch(`api/user/${userId}`)
        return data.value as Promise<{ data: ApiUser }>
    }

    async updateUser(userId: string, newUser: IUpdateUserRequestParams) {
        const { data } = await useCustomFetch(`api/user/${userId}`, {
            method: 'put',
            body: newUser,
        })
        return data.value as Promise<{ data: ApiUser }>
    }

    async signup(params: ISignupUserRequestParams) {
        return (
            await useCustomFetch('auth/register', {
                method: 'post',
                body: params,
            })
        ).data.value as Promise<{ data: ApiUser }>
    }

    async login(params: ILoginUserRequestParams) {
        const { data } = await useCustomFetch('auth/login', {
            method: 'post',
            body: params,
        })
        return data.value as Promise<ILoginUserResponse>
    }
}
