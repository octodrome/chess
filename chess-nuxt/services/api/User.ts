import type { ApiUser } from '~/server/models/user.model'
import type {
    ILoginUserRequestParams,
    ISignupUserRequestParams,
    ILoginUserResponse,
} from '~/types/user'

export default class User {
    async getAllOpponents(userId: string) {
        return (
            await useCustomFetch(`api/auth/user`, {
                query: { except: userId },
            })
        ).data.value as Promise<ApiUser[]>
    }

    async getUser(userId: string) {
        const { data } = await useCustomFetch(`api/auth/user/${userId}`)
        return data.value as Promise<ApiUser>
    }

    async signup(params: ISignupUserRequestParams) {
        return (
            await useCustomFetch('api/signup', {
                method: 'post',
                body: params,
            })
        ).data.value as Promise<ApiUser>
    }

    async login(params: ILoginUserRequestParams): Promise<ILoginUserResponse> {
        const { data } = await useCustomFetch('api/login', {
            method: 'post',
            body: params,
        })
        return data.value as Promise<ILoginUserResponse>
    }
}
