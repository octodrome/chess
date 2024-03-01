import type {
    ICreateHumanGameRequestParams,
    IHumanGame,
    IUpdateHumanGameRequestParams,
} from '~/types/humanGame'
import { HTTP } from './axios-config'

export default class Game {
    async getUserGames(userId: string): Promise<IHumanGame[]> {
        return (await HTTP.get(`game/?user=${userId}`)).data
    }

    async getGame(gameId: string): Promise<IHumanGame> {
        return (await HTTP.get(`game/${gameId}`)).data
    }

    async createGame(
        params: ICreateHumanGameRequestParams
    ): Promise<IHumanGame> {
        return (await HTTP.post('game/', params)).data
    }

    async sendMove(params: IUpdateHumanGameRequestParams): Promise<IHumanGame> {
        return (await HTTP.post(`game/${params.gameId}`, params.moves)).data
    }
}
