import { useHumanGameStore } from '~/stores/humanGameStore'
import { useBoardStore } from '~/stores/boardStore'
import services from '~/services/index'
import type { ApiUser } from '~/server/models/user.model'
import type {
    ILoginUserRequestParams,
    ISignupUserRequestParams,
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

                const humanGameStore = useHumanGameStore()
                humanGameStore.getUserGames()

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
                    this.users = opponentList
                    return opponentList
                })
        },

        async getUser(userId: string) {
            const user = await services.user.getUser(userId)
            this.user = user
        },
    },
})
