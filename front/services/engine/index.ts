export default class Engine {
    stockfishWorker
    computerLevel

    constructor() {
        this.stockfishWorker = process.client
            ? new Worker('/stockfish.js/stockfish.js', {
                  type: 'module',
              })
            : null
        this.computerLevel = 1
    }

    public init(): void {
        if (this.stockfishWorker) {
            this.stockfishWorker.postMessage('uci')
            this.stockfishWorker.postMessage('ucinewgame')

            this.stockfishWorker.onmessage = function (e) {
                console.log(e.data)
            }
        }
    }

    public sendMove(movesAsString: string): Promise<string> {
        //@TODO send fenstring to stockfish instead of move list string

        return new Promise((resolve, reject) => {
            this.stockfishWorker?.postMessage(
                `position startpos moves ${movesAsString}`
            )
            this.stockfishWorker?.postMessage(
                `go movetime ${this.computerLevel * 1000}`
            )

            if (this.stockfishWorker) {
                this.stockfishWorker.onmessage = (e) => {
                    if (e.data.split(' ')[0] === 'bestmove') {
                        resolve(e.data.split(' ')[1])
                    }
                }

                this.stockfishWorker.onerror = (error) => {
                    reject(error)
                }
            }
        })
    }
}
