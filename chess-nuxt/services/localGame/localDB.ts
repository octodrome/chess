import type { IComputerGame } from '~/types/computerGame'
export type IColor = 'white' | 'black'

const LocalStorage = process.client ? localStorage : null

export async function initLocalDB(): Promise<void> {
    if (LocalStorage && !LocalStorage.getItem('games')) {
        const emptyGameList: IComputerGame[] = []
        LocalStorage.setItem('games', JSON.stringify(emptyGameList))
    }
    console.log('Local game storage successfully initialized')
}

export async function createGameInLocalDB(
    newGame: IComputerGame
): Promise<IComputerGame> {
    const gameList = await findAllGamesInLocalDB()
    LocalStorage.setItem('games', JSON.stringify([...gameList, newGame]))

    return newGame
}

export async function findAllGamesInLocalDB(): Promise<IComputerGame[]> {
    return (await JSON.parse(
        LocalStorage.getItem('games') as string
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
    newFen: string
): Promise<IComputerGame> {
    const gameToUpdate = await findOneGameInLocalDB(id)
    gameToUpdate.updatedAt = new Date()
    gameToUpdate.fen = newFen
    const newGameList = (await findAllGamesInLocalDB()).filter(
        (game) => game.id !== id
    )
    LocalStorage.setItem(
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
    LocalStorage.setItem('games', JSON.stringify([...newGameList]))

    return deletedGame
}
