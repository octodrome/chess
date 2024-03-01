import { useHumanGameStore } from '~/stores/humanGameStore'
import { useBoardStore } from '~/stores/boardStore'
import services from '~/services/index'

const LocalStorage = process.client ? localStorage : null

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        users: [],
        token: LocalStorage ? LocalStorage.getItem('token') : '',
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
                LocalStorage.setItem('token', token)
                // location.reload();

                const humanGameStore = useHumanGameStore()
                humanGameStore.getUserGames(user._id)

                return { user, token }
            })
        },

        async logout() {
            this.user = null
            this.token = ''
            LocalStorage.removeItem('token')
            await navigateTo('/')
            location.reload()
            this.users = []

            const humanGameStore = useHumanGameStore()
            humanGameStore.resetGames()

            const boardStore = useBoardStore()
            boardStore.startNewGame('computer')
        },

        getAllOpponents(userId) {
            return services.user
                .getAllOpponents(userId)
                .then((opponentList) => {
                    this.users = opponentList
                    return opponentList
                })
        },

        getUser(userId) {
            return services.user.getUser(userId).then((user) => {
                this.user = user
            })
        },
    },
})
