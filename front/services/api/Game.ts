import type { ApiGame } from '~/types/api/game'
import type {
    ICreateHumanGameRequestParams,
    IUpdateHumanGameRequestParams,
} from '~/types/humanGame'

export default class Game {
    async getUserGames() {
        return await useCustomFetch<{ data: ApiGame[] }>(`api/game`)
    }

    async getGame(gameId: string) {
        return await useCustomFetch<{ data: ApiGame }>(`api/game/${gameId}`)
    }

    async createGame(params: ICreateHumanGameRequestParams) {
        return await useCustomFetch<{ data: ApiGame }>('api/game', {
            method: 'post',
            body: params,
        })
    }

    async deleteGame(gameId: string) {
        return await useCustomFetch<{ data: ApiGame }>(`api/game/${gameId}`, {
            method: 'delete',
        })
    }

    async sendMove(params: IUpdateHumanGameRequestParams) {
        return await useCustomFetch<{ data: ApiGame }>(
            `api/game/${params.gameId}`,
            {
                method: 'post',
                body: params.moves,
            }
        )
    }
}
