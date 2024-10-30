// Mock Worker for tests
globalThis.Worker = class {
    constructor() {}
    postMessage() {}
    terminate() {}
} as any

globalThis.WebSocket = class WebSocketMock {
    url: string
    readyState: number
    constructor(url: string) {
        this.url = url
        this.readyState = 1 // open
    }
    close() {
        this.readyState = 3 // closed
    }
    send(data: any) {
        console.log('Sending data:', data)
    }
} as any
