import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { productService } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const sellerId = (req as any).user.id;
  const productData = req.body;
  console.log("create product controller, req.body: ", productData);
  // sendResponse(res, 200, true, "checking state");
  const store = await productService.createProduct(sellerId, productData);
  sendResponse(res, 200, true, "product created successfully", store);
});

export const productController = {
  createProduct,
};
