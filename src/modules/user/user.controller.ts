import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userService.getUserById(userId);
  sendResponse(res, 200, true, "User retrieved successfully", user);
});
const getOrdersByUserId = catchAsync(async (req: Request, res: Response) => {
  console.log("hitting get orders");
  const userId = (req as any).user.id;
  const user = await userService.getOrdersByUserId(userId);
  sendResponse(res, 200, true, "orders retrieved successfully", user);
});

export const userController = {
  getUserById,
  getOrdersByUserId,
};
