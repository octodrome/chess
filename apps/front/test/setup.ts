import { vi } from 'vitest'
import type { WebSocketClient } from '~/plugins/websocket.client'

globalThis.Worker = class {
    constructor() {}
    postMessage() {}
    terminate() {}
} as any

vi.mock('~/plugins/websocket.client.ts', async (importOriginal) => {
    const actual = (await importOriginal()) as {
        default: typeof WebSocketClient
    }

    return {
        ...actual,
        default: {
            ...actual.default,
            connect: vi.fn().mockResolvedValue(undefined),
            sendMessage: vi.fn(),
        },
    }
})
