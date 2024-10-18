import { setActivePinia, createPinia } from 'pinia'
import { useComputerGameStore } from './computerGameStore'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import type { IComputerGame } from '~/types/computerGame'
import services from '~/services'

vi.mock('../services/index.ts', () => {
    return {
        default: {
            engine: {},
            localGame: {
                createLocalGame: vi.fn(() => Promise.resolve({})),
                getLocalGames: vi.fn(() => Promise.resolve([])),
            },
            user: {},
            game: {},
            socket: {},
        },
    }
})

describe('ComputerGame Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('has correct initial state', () => {
        const computerGameStore = useComputerGameStore()
        expect(computerGameStore.gameList).toStrictEqual([])
        expect(computerGameStore.currentGame).toBe(null)
    })

    describe('actions', () => {
        afterEach(() => {
            vi.restoreAllMocks()
        })

        const fakeGame: IComputerGame = {
            id: 'fake-id',
            computerName: 'fake-name',
            createdAt: new Date(),
            updatedAt: new Date(),
            playerColor: 'white',
            computerLevel: 1,
            fen: 'fake-fen',
        }

        it('createGame()', async () => {
            const computerGameStore = useComputerGameStore()
            ;(services.localGame.createLocalGame as any).mockResolvedValue(
                fakeGame
            )

            expect(computerGameStore.currentGame).toStrictEqual(null)
            expect(computerGameStore.gameList).toStrictEqual([])
            await computerGameStore.createGame({
                playerColor: 'white',
                computerLevel: 1,
            })
            expect(computerGameStore.currentGame).toStrictEqual(fakeGame)
            expect(computerGameStore.gameList).toStrictEqual([fakeGame])
        })

        it('getGames()', async () => {
            const computerGameStore = useComputerGameStore()
            ;(services.localGame.getLocalGames as any).mockResolvedValue([
                fakeGame,
                fakeGame,
            ])

            expect(computerGameStore.gameList).toStrictEqual([])
            await computerGameStore.getGames()
            expect(computerGameStore.gameList).toStrictEqual([
                fakeGame,
                fakeGame,
            ])
        })
    })
})
