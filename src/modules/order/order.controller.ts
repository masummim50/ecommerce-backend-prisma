import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  console.log("create order controller body: ", req.body);
  const userId = (req as any).user.id;
  const products = await orderService.createOrder(req.body, userId);
  sendResponse(res, 200, true, "cart decreased successfully", products);
});

const getOrderDetails = catchAsync(async (req: Request, res: Response) => {
  console.log("get order details controller body: ", req.body);
  const role = (req as any).user.role;
  const orderId = req.params.id;
  const products = await orderService.getOrderDetails(orderId, role);
  sendResponse(res, 200, true, "Order Details retrived successfully", products);
});

const getOrdersBySellerId = catchAsync(async (req: Request, res: Response) => {
  const sellerId = (req as any).user.id;
  const orders = await orderService.getOrdersBySellerId(sellerId);
  sendResponse(res, 200, true, "Orders retrieved successfully", orders);
});

export const orderController = {
  createOrder,
  getOrderDetails,
  getOrdersBySellerId,
};
