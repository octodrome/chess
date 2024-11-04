import User from './api/User'
import Engine from './engine'
import Game from './api/Game'
import LocalGame from './localGame/LocalGame'
// import GoWasmPOC from './go-wasm-poc'

export default {
    user: new User(),
    engine: new Engine(),
    game: new Game(),
    localGame: new LocalGame(),
    // goWasmPOC: new GoWasmPOC(),
}
