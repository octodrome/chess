import express, { Router } from 'express';
import {
  createGame,
  getAllGames,
  getOneGame,
  deleteGame,
  addMove,
} from '../controllers/game.controller';
import auth from '../../middlewares/auth';

const gameRoutes: Router = express.Router();

/**
 * @openapi
 * /game:
 *   post:
 *     summary: Creates a game
 *     description: List of games
 */
gameRoutes.post('/', auth, createGame);

/**
 * @openapi
 * /game:
 *   post:
 *     summary: Modifies a game by adding a move
 *     description: List of games
 */
gameRoutes.put('/:id', auth, addMove);

/**
 * @openapi
 * /game:
 *   get:
 *     summary: Retrieve a list of games
 *     description: List of games
 */
gameRoutes.get('/', getAllGames);

/**
 * @openapi
 * /game/{id}:
 *   get:
 *     summary: Retrieve a particular game
 *     description: List of games
 */
gameRoutes.get('/:id', auth, getOneGame);

/**
 * @openapi
 * /game/{id}:
 *   delete:
 *     summary: Deletes a particular game
 *     description: List of games
 */
gameRoutes.delete('/:id', auth, deleteGame);

export default gameRoutes;
