import { v4 as uuidv4 } from 'uuid'
import {
    createGameInLocalDB,
    findAllGamesInLocalDB,
    findOneGameInLocalDB,
    initLocalDB,
    removeGameFromLocalDB,
    updateOneGameInLocalDB,
} from './localDB'
import type {
    IComputerGame,
    ICreateComputerGameParams,
    IUpdateComputerGameParams,
} from '~/types/computerGame'
import {
    uniqueNamesGenerator,
    adjectives,
    animals,
} from 'unique-names-generator'
import type { Config } from 'unique-names-generator'
const nameGeneretorConfig: Config = {
    dictionaries: [adjectives, animals],
    separator: '-',
    length: 2,
}

export default class LocalGame {
    constructor() {
        initLocalDB()
    }

    async getLocalGames(): Promise<IComputerGame[]> {
        return await findAllGamesInLocalDB()
    }

    async getLocalGame(id: string): Promise<IComputerGame> {
        return await findOneGameInLocalDB(id)
    }

    async createLocalGame(
        params: ICreateComputerGameParams
    ): Promise<IComputerGame> {
        const game = {
            id: uuidv4(),
            created_at: new Date(),
            updated_at: new Date(),
            creator_color: params.playerColor,
            guest_color: params.opponentColor,
            guest_level: params.computerLevel,
            guest_name: uniqueNamesGenerator(nameGeneretorConfig),
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            moves: [],
            creator_captured_pieces: [],
            guest_captured_pieces: [],
        }
        return await createGameInLocalDB(game)
    }

    async updateLocalGame(
        params: IUpdateComputerGameParams
    ): Promise<IComputerGame> {
        return await updateOneGameInLocalDB(
            params.id,
            params.newFen,
            params.moves,
            params.creator_captured_pieces,
            params.guest_captured_pieces
        )
    }

    async deleteLocalGame(id: string): Promise<IComputerGame> {
        return await removeGameFromLocalDB(id)
    }
}
