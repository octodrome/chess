// @ts-nocheck
// @TODO maybe try fetch wasm_exec.js from public/ too
import './wasm_exec.js'

export default class GoWasmPOC {
    stockfishWorker: any
    computerLevel: any

    constructor() {
        if (process.client) this.loadWasm()
    }

    async loadWasm(): Promise<void> {
        const goWasm = new window.Go()
        const result = await WebAssembly.instantiateStreaming(
            fetch('main.wasm'),
            goWasm.importObject
        )
        goWasm.run(result.instance)
    }

    public generateGame(fen: string) {
        const result = process.client
            ? JSON.parse(window.generateGame(fen))
            : { error: 'window is not accessible from here' }

        return result
    }
}
