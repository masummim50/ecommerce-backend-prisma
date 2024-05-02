import express from "express";
import { userService } from "./user.service";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const userRoutes = express.Router();

userRoutes.get("/orders", auth("customer"), userController.getOrdersByUserId);
userRoutes.get("/:id", userController.getUserById);

export default userRoutes;
