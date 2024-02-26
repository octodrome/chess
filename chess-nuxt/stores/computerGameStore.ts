import { useBoardStore } from "~/stores/boardStore"
import services from "~/services/index";

import GameDev from "../../chess-legal-moves/src/index";
import GameProd from "chess-legal-moves";
const Game = process.env.NODE_ENV === 'development' ? GameDev : GameProd;

export const useComputerGameStore = defineStore('computerGame', {
  state: () => ({
    gameList: [],
    currentGame: null,
  }),

  actions: {
    createGame(params) {
      return services.localGame.createLocalGame(params).then((newGame) => {
        this.SET_CURRENT_GAME(newGame);
        this.ADD_GAME(newGame);

        return newGame;
      });
    },

    sendMove(move) {
      if (this.currentGame) {
        // @TODO update the lib to prevent from creating a second object like this
        const game = new Game(this.currentGame.fen);
        const newFen = game.addMove(move);
        const updatedGame = new Game(newFen);

        return services.localGame
          .updateLocalGame({ id: this.currentGame.id, newFen })
          .then((newGame) => {
            this.SET_CURRENT_GAME(newGame);
            const boardStore = useBoardStore()
            boardStore.initBoard({
              opponentType: "computer",
              playerColor: newGame.playerColor,
              hasToPlay: updatedGame.state.hasToPlay,
              round: updatedGame.state.fullMoveClock,
              fenBoard: updatedGame.state.fenBoard,
              legalMoves: updatedGame.scan.legalMoves,
            });
            return newGame;
          });
      }
    },

    getGames() {
      return services.localGame.getLocalGames().then((gameList) => {
        this.SET_GAME_LIST(gameList);

        return gameList;
      });
    },

    getGame(gameId) {
      return services.localGame.getLocalGame(gameId).then((game) => {
        const gameAnalysis = new Game(game.fen);

        this.SET_CURRENT_GAME(game);
        const boardStore = useBoardStore()
        boardStore.initBoard({
          opponentType: "computer",
          playerColor: game.playerColor,
          hasToPlay: gameAnalysis.state.hasToPlay,
          round: gameAnalysis.state.fullMoveClock,
          fenBoard: gameAnalysis.state.fenBoard,
          legalMoves: gameAnalysis.scan.legalMoves,
        });
        return game;
      });
    },

    deleteGame(gameId) {
      return services.localGame.deleteLocalGame(gameId).then((game) => {
        this.DELETE_GAME(game.id);
        this.RESET_CURRENT_GAME();
        return game;
      });
    },

    SET_CURRENT_GAME(game) {
      this.currentGame = game;
    },

    SET_GAME_LIST(gameList) {
      this.gameList = gameList;
    },

    RESET_CURRENT_GAME() {
      this.currentGame = null;
    },

    ADD_GAME(game) {
      this.gameList = [...this.gameList, game];
    },

    DELETE_GAME(gameId) {
      this.gameList = this.gameList.filter((game) => game.id !== gameId);
    },
  },
})
