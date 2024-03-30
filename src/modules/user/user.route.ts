
import express from 'express'
import { userService } from './user.service';
import { userController } from './user.controller';

const userRoutes = express.Router();

userRoutes.get("/:id", userController.getUserById);

export default userRoutes;