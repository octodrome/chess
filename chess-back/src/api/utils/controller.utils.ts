import { Request } from 'express';
import getUserIdFromHeader from './getUserIdFromHeader';

interface IGame {
  creator: string;
  guest: string;
  hasToPlay: string;
  moves: string[];
  _id: string;
}

export const isNotAllowedOnTheGame = (game: IGame, req: Request): boolean => {
  const isNotCreator = game.creator !== getUserIdFromHeader(req.headers.authorization!);
  const isNotGuest = game.guest !== getUserIdFromHeader(req.headers.authorization!);

  return isNotCreator && isNotGuest;
};

export const isWrongTurn = (game: IGame, req: Request): boolean => {
  return game.hasToPlay !== getUserIdFromHeader(req.headers.authorization!);
};
