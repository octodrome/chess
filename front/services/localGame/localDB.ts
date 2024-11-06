import type { IComputerGame } from '~/types/computerGame'
export type IColor = 'white' | 'black'

const LocalStorage = process.client ? localStorage : null

export async function initLocalDB(): Promise<void> {
    if (LocalStorage && !LocalStorage.getItem('games')) {
        const emptyGameList: IComputerGame[] = []
        LocalStorage.setItem('games', JSON.stringify(emptyGameList))
    }
}

export async function createGameInLocalDB(
    newGame: IComputerGame
): Promise<IComputerGame> {
    const gameList = await findAllGamesInLocalDB()
    LocalStorage?.setItem('games', JSON.stringify([...gameList, newGame]))

    return newGame
}

export async function findAllGamesInLocalDB(): Promise<IComputerGame[]> {
    return (await JSON.parse(
        LocalStorage?.getItem('games') as string
    )) as IComputerGame[]
}

export async function findOneGameInLocalDB(id: string): Promise<IComputerGame> {
    const game = (await findAllGamesInLocalDB()).filter(
        (game: IComputerGame) => game.id === id
    )
    return game[0]
}

export async function updateOneGameInLocalDB(
    id: string,
    newFen: string,
    moves: string[],
    creator_captured_pieces: any[],
    guest_captured_pieces: any[]
): Promise<IComputerGame> {
    const gameToUpdate = await findOneGameInLocalDB(id)
    gameToUpdate.updatedAt = new Date()
    gameToUpdate.fen = newFen
    gameToUpdate.moves = moves
    gameToUpdate.creator_captured_pieces = creator_captured_pieces
    gameToUpdate.guest_captured_pieces = guest_captured_pieces
    const newGameList = (await findAllGamesInLocalDB()).filter(
        (game) => game.id !== id
    )
    LocalStorage?.setItem(
        'games',
        JSON.stringify([...newGameList, gameToUpdate])
    )

    return gameToUpdate
}

export async function removeGameFromLocalDB(
    id: string
): Promise<IComputerGame> {
    const deletedGame = await findOneGameInLocalDB(id)
    const newGameList = (await findAllGamesInLocalDB()).filter(
        (game) => game.id !== id
    )
    LocalStorage?.setItem('games', JSON.stringify([...newGameList]))

    return deletedGame
}
