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
            guest_name: 'fake-name',
            created_at: new Date(),
            updated_at: new Date(),
            creator_color: 'white',
            guest_color: 'black',
            guest_level: 1,
            fen: 'fake-fen',
            moves: [],
            creator_captured_pieces: [],
            guest_captured_pieces: [],
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
                guestColor: 'black',
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
