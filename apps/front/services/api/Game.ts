import type { ApiGame } from '~/types/api/game'
import type {
    ICreateHumanGameRequestParams,
    IUpdateHumanGameRequestParams,
} from '~/types/humanGame'

export default class Game {
    async getUserGames() {
        return await useCustomFetch<{ data: ApiGame[] }>(`game`)
    }

    async getGame(gameId: string) {
        return await useCustomFetch<{ data: ApiGame }>(`game/${gameId}`)
    }

    async createGame(params: ICreateHumanGameRequestParams) {
        return await useCustomFetch<{ data: ApiGame }>('game', {
            method: 'post',
            body: params,
        })
    }

    async deleteGame(gameId: string) {
        return await useCustomFetch<{ data: ApiGame }>(`game/${gameId}`, {
            method: 'delete',
        })
    }

    async sendMove(params: IUpdateHumanGameRequestParams) {
        return await useCustomFetch<{ data: ApiGame }>(
            `game/${params.gameId}`,
            {
                method: 'put',
                body: {
                    moves: params.moves,
                    fen: params.fen,
                },
            }
        )
    }
}
