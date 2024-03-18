import type { ApiGame } from '~/server/models/game.model'
import type {
    ICreateHumanGameRequestParams,
    IUpdateHumanGameRequestParams,
} from '~/types/humanGame'

export default class Game {
    async getUserGames(userId: string) {
        const { data } = await useCustomFetch(`api/auth/game`, {
            query: { user: userId },
        })
        return data.value as Promise<ApiGame[]>
    }

    async getGame(gameId: string) {
        const { data } = await useCustomFetch(`api/auth/game/${gameId}`)
        return data.value as Promise<ApiGame>
    }

    async createGame(params: ICreateHumanGameRequestParams) {
        const { data } = await useCustomFetch('api/auth/game/', {
            method: 'post',
            body: params,
        })
        return data.value as Promise<ApiGame>
    }

    async sendMove(params: IUpdateHumanGameRequestParams) {
        const { data } = await useCustomFetch(
            `api/auth/game/${params.gameId}`,
            {
                method: 'post',
                body: params.moves,
            }
        )
        return data.value as Promise<ApiGame>
    }
}
