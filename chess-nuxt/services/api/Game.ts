import type {
    ICreateHumanGameRequestParams,
    IHumanGame,
    IUpdateHumanGameRequestParams,
} from '~/types/humanGame'

export default class Game {
    async getUserGames(userId: string): Promise<IHumanGame[]> {
        return (
            await useCustomFetch(`api/game`, {
                query: { user: userId },
            })
        ).data.value
    }

    async getGame(gameId: string): Promise<IHumanGame> {
        return (await useCustomFetch(`api/game/${gameId}`)).data.value
    }

    async createGame(
        params: ICreateHumanGameRequestParams
    ): Promise<IHumanGame> {
        return (
            await useCustomFetch('api/game/', {
                method: 'post',
                body: params,
            })
        ).data.value
    }

    async sendMove(params: IUpdateHumanGameRequestParams): Promise<IHumanGame> {
        return (
            await useCustomFetch(`api/game/${params.gameId}`, {
                method: 'post',
                body: params.moves,
            })
        ).data.value
    }
}
