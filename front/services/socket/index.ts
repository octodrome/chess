import { useHumanGameStore } from '~/stores/humanGameStore'

interface IjoinGameParams {
    userId: string
    gameId: string
}

interface IMessage {
    from: string
    content: string
}

export default class WebSocketClient {
    socket: WebSocket | null = null

    constructor() {
        if (process.client) {
            // Ensure code only runs in the browser
            this.connect()
        }
    }

    connect() {
        this.socket = new WebSocket('ws://localhost:5000/ws')

        this.socket.onopen = () => {
            console.log('Connected to WebSocket server')
        }

        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            const humanGameStore = useHumanGameStore()
            humanGameStore.addMessage(message)
        }

        this.socket.onclose = () => {
            console.log('Disconnected from WebSocket server')
        }

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error)
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
            console.error('WebSocket is not connected.')
        }
    }

    joinGame(params: IjoinGameParams): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({ event: 'joinGame', data: params })
            )
        } else {
            console.error('WebSocket is not connected.')
        }
    }

    leaveGame(params: IjoinGameParams): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({ event: 'leaveGame', data: params })
            )
            this.socket.close()
        } else {
            console.error('WebSocket is not connected.')
        }
    }
}
