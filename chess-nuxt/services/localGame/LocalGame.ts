import { v4 as uuidv4 } from "uuid";
import {
  createGameInLocalDB,
  findAllGamesInLocalDB,
  findOneGameInLocalDB,
  initLocalDB,
  removeGameFromLocalDB,
  updateOneGameInLocalDB,
} from "./localDB";
import {
  IComputerGame,
  ICreateComputerGameParams,
  IUpdateComputerGameParams,
} from "~/types/computerGame";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  animals,
} from "unique-names-generator";
const nameGeneretorConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: "-",
  length: 2,
};

export default class LocalGame {
  constructor() {
    initLocalDB();
  }

  async getLocalGames(): Promise<IComputerGame[]> {
    return await findAllGamesInLocalDB();
  }

  async getLocalGame(id: string): Promise<IComputerGame> {
    return await findOneGameInLocalDB(id);
  }

  async createLocalGame(
    params: ICreateComputerGameParams
  ): Promise<IComputerGame> {
    const game = {
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      playerColor: params.playerColor,
      computerLevel: params.computerLevel,
      computerName: uniqueNamesGenerator(nameGeneretorConfig),
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    };
    return await createGameInLocalDB(game);
  }

  async updateLocalGame(
    params: IUpdateComputerGameParams
  ): Promise<IComputerGame> {
    return await updateOneGameInLocalDB(params.id, params.newFen);
  }

  async deleteLocalGame(id: string): Promise<IComputerGame> {
    return await removeGameFromLocalDB(id);
  }
}
