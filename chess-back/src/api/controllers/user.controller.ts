import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import {
  createUserInDB,
  findAllUsersInDB,
  findAllOpponentsInDB,
  findOneUserByIDInDB,
  findOneUserByEmailInDB,
  removeUserFromDB,
} from '../services/user.service';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await createUserInDB({
      email: req.body.email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: 'User successfully created' });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findOneUserByEmailInDB(req.body.email);
    if (!user) throw createError(404, 'User not found');
    const validation = await bcrypt.compare(req.body.password, user.password);
    if (!validation) throw createError(400, 'Wrong password');

    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
      },
      token: jwt.sign({ userId: user._id }, config.jwtSecret as string, { expiresIn: '24h' }),
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let userList;
    if (req.query.except) {
      userList = await findAllOpponentsInDB(req.query.except as string);
    } else {
      userList = await findAllUsersInDB();
    }
    return res.status(200).json(userList);
  } catch (error) {
    return next(error);
  }
};

export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findOneUserByIDInDB(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await removeUserFromDB(req.params.id);
    return res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
    return next(error);
  }
};
