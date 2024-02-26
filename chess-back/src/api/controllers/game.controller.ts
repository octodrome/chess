import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import getUserIdFromHeader from '../utils/getUserIdFromHeader';
import { isNotAllowedOnTheGame, isWrongTurn } from '../utils/controller.utils';
import error from '../../logs/error';
import {
  createGameInDB,
  findAllGamesInDB,
  findOneGameInDB,
  removeGameFromDB,
  updateOneGameInDB,
  findAllGamesFromUserInDB,
} from '../services/game.service';

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const game = await createGameInDB({
      creator: getUserIdFromHeader(req.headers.authorization!),
      guest: req.body.guest,
      hasToPlay: req.body.hasToPlay,
      moves: req.body.moves,
    });
    return res.status(201).json(game);
  } catch (error: any) {
    return next(error);
  }
};

export const addMove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const game = await findOneGameInDB(req.params.id);
    if (isNotAllowedOnTheGame(game, req)) throw createError(400, error.notAllowedOnGame);
    if (isWrongTurn(game, req)) throw createError(400, error.isWrongTurn);

    // Adds the played move
    const moves = game.moves;
    moves.push(req.body.move);
    // Toggles hasToPlay to the next player
    const hasToPlay = game.hasToPlay === game.creator ? game.guest : game.creator;
    await updateOneGameInDB(req.params.id, { moves, hasToPlay });
    return res.status(200).json({ message: 'Successfully played a move' });
  } catch (error) {
    return next(error);
  }
};

export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let gameList;
    if (req.query.user) {
      gameList = await findAllGamesFromUserInDB(req.query.user as string);
    } else {
      gameList = await findAllGamesInDB();
    }
    return res.status(200).json(gameList);
  } catch (error) {
    return next(error);
  }
};

export const getOneGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const game = await findOneGameInDB(req.params.id);
    return res.status(200).json(game);
  } catch (error) {
    return next(error);
  }
};

export const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await removeGameFromDB(req.params.id);
    return res.status(200).json({ message: 'Game successfully deleted' });
  } catch (error) {
    return next(error);
  }
};
