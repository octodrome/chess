import type { ApiUser } from '~/types/api/user'
import type {
    ILoginUserRequestParams,
    ISignupUserRequestParams,
    ILoginUserResponse,
} from '~/types/user'

export default class User {
    async getAllOpponents(userId: string) {
        return (
            await useCustomFetch('api/user', {
                query: { except: userId },
            })
        ).data.value.data as Promise<ApiUser[]>
    }

    async getUser(userId: string) {
        const { data } = await useCustomFetch(`api/user/${userId}`)
        return data.value as Promise<ApiUser>
    }

    async signup(params: ISignupUserRequestParams) {
        return (
            await useCustomFetch('auth/register', {
                method: 'post',
                body: params,
            })
        ).data.value as Promise<ApiUser>
    }

    async login(params: ILoginUserRequestParams): Promise<ILoginUserResponse> {
        const { data } = await useCustomFetch('auth/login', {
            method: 'post',
            body: params,
        })
        return data.value as Promise<ILoginUserResponse>
    }
}
