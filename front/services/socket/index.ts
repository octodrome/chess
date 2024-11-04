import { useHumanGameStore } from '~/stores/humanGameStore'
import { useUserStore } from '~/stores/userStore'
import type { IMessage } from '~/types/humanGame'

interface IjoinGameParams {
    userId: string
    gameId: string
}

export default class WebSocketClient {
    socket: WebSocket | null = null

    constructor() {
        if (process.client) {
            this.connect()
        }
    }

    connect() {
        this.socket = new WebSocket('ws://localhost:5000/ws')

        this.socket.onopen = () => {
            console.log('🧦 Connected to WebSocket server')
        }

        this.socket.onmessage = (event) => {
            const message: { data: IMessage; event: 'message' } = JSON.parse(
                event.data
            )
            console.log('🧦 onmessage', message)
            const humanGameStore = useHumanGameStore()
            const userStore = useUserStore()
            if (userStore.user?.ID !== message.data.from_id) {
                humanGameStore.addMessage(message.data)
            }
        }

        this.socket.onclose = () => {
            console.log('🧦 Disconnected from WebSocket server')
        }

        this.socket.onerror = (error) => {
            console.error('🧦 WebSocket error:', error)
        }
    }

    sendMessage(message: IMessage): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            const humanGameStore = useHumanGameStore()
            humanGameStore.addMessage(message)
            this.socket.send(
                JSON.stringify({ event: 'message', data: message })
            )
        } else {
            console.error('🧦 WebSocket is not connected.')
        }
    }

    joinGame(params: IjoinGameParams): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({ event: 'joinGame', data: params })
            )
        } else {
            console.error('🧦 WebSocket is not connected.')
        }
    }

    leaveGame(params: IjoinGameParams): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({ event: 'leaveGame', data: params })
            )
            this.socket.close()
        } else {
            console.error('🧦 WebSocket is not connected.')
        }
    }
}
