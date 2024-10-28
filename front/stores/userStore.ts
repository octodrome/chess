import { useHumanGameStore } from '~/stores/humanGameStore'
import { useBoardStore } from '~/stores/boardStore'
import services from '~/services/index'
import type { ApiUser } from '~/types/api/user'
import type {
    ILoginUserRequestParams,
    ISignupUserRequestParams,
    IUpdateUserRequestParams,
} from '~/types/user'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as ApiUser | null,
        users: [] as ApiUser[],
        token: useCookie('token'),
    }),

    getters: {
        loggedIn: (state) => !!state.user,
    },

    actions: {
        async signup(params: ISignupUserRequestParams) {
            return services.user.signup(params).then((user) => {
                return user
            })
        },

        async login(params: ILoginUserRequestParams) {
            return services.user.login(params).then(({ user, token }) => {
                this.user = user
                this.token = token
                const cookie = useCookie('token')
                cookie.value = this.token
                location.reload()

                // const humanGameStore = useHumanGameStore()
                // humanGameStore.getUserGames()

                return { user, token }
            })
        },

        async logout() {
            this.user = null
            this.token = null
            const cookie = useCookie('token')
            cookie.value = this.token
            await navigateTo('/')
            location.reload()
            this.users = []

            const humanGameStore = useHumanGameStore()
            humanGameStore.resetGames()

            const boardStore = useBoardStore()
            boardStore.startNewGame('computer')
        },

        async getAllOpponents(userId: string) {
            return services.user
                .getAllOpponents(userId)
                .then((opponentList) => {
                    this.users = opponentList.data
                    return opponentList.data
                })
        },

        async getUser(userId: string) {
            const user = await services.user.getUser(userId)
            this.user = user.data
        },

        async updateUser(userId: string, params: IUpdateUserRequestParams) {
            const user = await services.user.updateUser(userId, params)
            this.user = user.data
        },
    },
})
