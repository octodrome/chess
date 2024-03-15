import type {
    ICreateHumanGameRequestParams,
    IHumanGame,
    IUpdateHumanGameRequestParams,
} from '~/types/humanGame'

export default class Game {
    async getUserGames(userId: string): Promise<IHumanGame[]> {
        const { data } = await useCustomFetch(`api/game`, {
            query: { user: userId },
        })
        return data.value
    }

    async getGame(gameId: string): Promise<IHumanGame> {
        const { data } = await useCustomFetch(`api/game/${gameId}`)
        return data.value
    }

    async createGame(
        params: ICreateHumanGameRequestParams
    ): Promise<IHumanGame> {
        const { data } = await useCustomFetch('api/game/', {
            method: 'post',
            body: params,
        })
        return data.value
    }

    async sendMove(params: IUpdateHumanGameRequestParams): Promise<IHumanGame> {
        const { data } = await useCustomFetch(`api/game/${params.gameId}`, {
            method: 'post',
            body: params.moves,
        })
        return data.value
    }
}
