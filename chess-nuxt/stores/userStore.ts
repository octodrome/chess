import { useHumanGameStore } from '~/stores/humanGameStore'
import { useBoardStore } from '~/stores/boardStore'
import services from '~/services/index'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        users: [],
        token: useCookie('token'),
    }),

    getters: {
        loggedIn: (state) => !!state.user,
    },

    actions: {
        signup(params) {
            return services.user.signup(params).then((user) => {
                return user
            })
        },

        login(params) {
            return services.user.login(params).then(({ user, token }) => {
                this.user = user
                this.token = token
                const cookie = useCookie('token')
                cookie.value = this.token
                // location.reload();

                const humanGameStore = useHumanGameStore()
                humanGameStore.getUserGames(user._id)

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

        getAllOpponents(userId: string) {
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
