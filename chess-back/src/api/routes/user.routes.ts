import express, { Router } from 'express';
import { signup, login, getAllUsers, getOneUser, deleteUser } from '../controllers/user.controller';
const userRoutes: Router = express.Router();

/**
 * @openapi
 * /user/signup:
 *   post:
 *     summary: Creates a user
 *     description: List of users
 */
userRoutes.post('/signup', signup);

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: Creates a user
 *     description: List of users
 */
userRoutes.post('/login', login);

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Retrieve a list of users
 *     description: List of users
 */
userRoutes.get('/', getAllUsers);

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Retrieve a particular user
 *     description: List of users
 */
userRoutes.get('/:id', getOneUser);

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: Deletes a particular user
 *     description: List of users
 */
userRoutes.delete('/:id', deleteUser);

export default userRoutes;
