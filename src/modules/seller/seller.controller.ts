import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sellerService } from "./seller.service";
import sendResponse from "../../shared/sendResponse";

const getSellerById = catchAsync(async (req: Request, res: Response) => {
  const sellerId = req.params.id;
  const seller = await sellerService.getSellerById(sellerId);
  sendResponse(res, 200, true, "Seller retrieved successfully", seller);
});
const createStore = catchAsync(async (req: Request, res: Response) => {
  const sellerId = (req as any).user.id;
  const storeData = req.body;
  const store = await sellerService.createStore(sellerId, {
    ...storeData,
    seller: sellerId,
  });
  sendResponse(res, 200, true, "Store created successfully", store);
});
const getStore = catchAsync(async (req: Request, res: Response) => {
  const sellerId = (req as any).user.id;
  const store = await sellerService.getStore(sellerId);
  sendResponse(res, 200, true, "Store retrieved successfully", store);
});

export const sellerController = {
  getSellerById,
  createStore,
  getStore,
};
