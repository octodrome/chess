import type {
    ILoginUserRequestParams,
    ISignupUserRequestParams,
    ILoginUserResponse,
    IUser,
} from '~/types/user'

export default class User {
    async getAllOpponents(userId: string): Promise<IUser[]> {
        return (
            await useCustomFetch(`api/user`, {
                query: { except: userId },
            })
        ).data.value
    }

    async getUser(userId: string): Promise<IUser> {
        const { data } = await useCustomFetch(`api/user/${userId}`)
        return data.value
    }

    async signup(params: ISignupUserRequestParams): Promise<IUser> {
        return (
            await useCustomFetch('api/user/signup', {
                method: 'post',
                body: params,
            })
        ).data.value
    }

    async login(params: ILoginUserRequestParams): Promise<ILoginUserResponse> {
        const { data } = await useCustomFetch('api/user/login', {
            method: 'post',
            body: params,
        })
        return data.value
    }
}
