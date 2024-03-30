import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userService.getUserById(userId);
  sendResponse(res, 200, true, "User retrieved successfully", user);
});

export const userController = {
  getUserById,
};
