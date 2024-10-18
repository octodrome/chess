import type { ApiGame } from '~/types/api/game'
import type {
    ICreateHumanGameRequestParams,
    IUpdateHumanGameRequestParams,
} from '~/types/humanGame'

export default class Game {
    async getUserGames() {
        const { data } = await useCustomFetch(`api/game`)
        return data.value as unknown as Promise<{ data: ApiGame[] }>
    }

    async getGame(gameId: string) {
        const { data } = await useCustomFetch(`api/game/${gameId}`)
        return data.value as Promise<{ data: ApiGame }>
    }

    async createGame(params: ICreateHumanGameRequestParams) {
        const { data } = await useCustomFetch('api/game', {
            method: 'post',
            body: params,
        })
        return data.value as Promise<{ data: ApiGame }>
    }

    async deleteGame(gameId: string) {
        const { data } = await useCustomFetch(`api/game/${gameId}`, {
            method: 'delete',
        })
        return data.value as Promise<{ data: ApiGame }>
    }

    async sendMove(params: IUpdateHumanGameRequestParams) {
        const { data } = await useCustomFetch(`api/game/${params.gameId}`, {
            method: 'post',
            body: params.moves,
        })
        return data.value as Promise<{ data: ApiGame }>
    }
}
