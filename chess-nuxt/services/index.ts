import User from './api/User'
import Engine from './engine'
import Game from './api/Game'
import SocketIO from './socket'
import LocalGame from './localGame/LocalGame'

export default {
    user: new User(),
    engine: new Engine(),
    game: new Game(),
    socket: new SocketIO(),
    localGame: new LocalGame(),
}
