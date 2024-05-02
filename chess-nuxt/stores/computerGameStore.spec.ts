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

        it('createGame()', async () => {
            const fakeGame: IComputerGame = {
                id: 'fake-id',
                computerName: 'fake-name',
                createdAt: new Date(),
                updatedAt: new Date(),
                playerColor: 'white',
                computerLevel: 1,
                fen: 'fake-fen',
            }
            services.localGame.createLocalGame.mockResolvedValue(fakeGame)

            const computerGameStore = useComputerGameStore()
            await computerGameStore.createGame({
                playerColor: 'white',
                computerLevel: 1,
            })
            expect(computerGameStore.currentGame).toStrictEqual(fakeGame)
            expect(computerGameStore.gameList).toStrictEqual([fakeGame])
        })
    })
})
