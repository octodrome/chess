// @TODO maybe try fetch wasm_exec.js from public/ too
import '../go-wasm-poc/wasm_exec.js'

export default class GoWasmPOC {
    stockfishWorker
    computerLevel

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
