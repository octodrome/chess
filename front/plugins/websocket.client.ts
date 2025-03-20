import { useHumanGameStore } from '~/stores/humanGameStore'
import { useUserStore } from '~/stores/userStore'
import type { ApiMessage } from '~/types/humanGame'

interface SocketJoinGameParams {
    userId: number
    gameId: number
}

type SocketGameMessage = { data: ApiMessage; event: 'message' }
type SocketGameMove = { data: ApiMessage; event: 'move' }
type SocketMessage = SocketGameMessage | SocketGameMove

export class WebSocketClient {
    socket: WebSocket | null = null

    async connect(socketUrl: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.socket = new WebSocket(socketUrl)

            this.socket.onopen = () => {
                console.log('🧦 Connected to WebSocket server')
                resolve()
            }

            this.socket.onmessage = (event) => {
                const message: SocketMessage = JSON.parse(event.data)
                console.log('🧦 onmessage', message)

                if (message.event === 'message') {
                    const humanGameStore = useHumanGameStore()
                    const userStore = useUserStore()
                    if (userStore.user?.id !== message.data.from_id) {
                        humanGameStore.addMessage(message.data)
                    }
                }

                if (message.event === 'move') {
                    const humanGameStore = useHumanGameStore()
                    humanGameStore.getGame(String(message.data.game_id))
                }
            }

            this.socket.onclose = () => {
                console.log('🧦 Disconnected from WebSocket server')
            }

            this.socket.onerror = (error) => {
                console.error('🧦 WebSocket error:', error)
                reject(error)
            }
        })
    }

    sendMessage(message: ApiMessage): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            const humanGameStore = useHumanGameStore()
            humanGameStore.addMessage(message)
            this.socket.send(
                JSON.stringify({ event: 'message', data: message })
            )
        } else {
            console.error('🧦[sendMessage] WebSocket is not connected.')
        }
    }

    sendMove(move: ApiMessage): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ event: 'move', data: move }))
        } else {
            console.error('🧦[sendMove] WebSocket is not connected.')
        }
    }

    joinGame(params: SocketJoinGameParams): void {
        console.log('🧦[joinGame] params', params)
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({ event: 'joinGame', data: params })
            )
        } else {
            console.error('🧦[joinGame] WebSocket is not connected.')
        }
    }

    leaveGame(params: SocketJoinGameParams): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({ event: 'leaveGame', data: params })
            )
            this.socket.close()
        } else {
            console.error('🧦[leaveGame] WebSocket is not connected.')
        }
    }
}

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig()
    const socketClient = new WebSocketClient()
    await socketClient.connect(config.public.socketServerUrl as string)

    nuxtApp.provide('webSocketClient', socketClient as WebSocketClient)
})
