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
const getProductsByStoreId = catchAsync(async (req: Request, res: Response) => {
  const storeId = req.params.id;

  const products = await productService.getProductsByStoreId(storeId);
  sendResponse(res, 200, true, "products retrieved successfully", products);
});

const deleteProductById = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;

  const products = await productService.deleteProductById(productId);
  sendResponse(res, 200, true, "product deleted successfully", products);
});
const getPopularProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await productService.getPopularProducts();
  sendResponse(
    res,
    200,
    true,
    "popular products retrieved successfully",
    products
  );
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;
  const products = await productService.getProductById(productId);
  sendResponse(
    res,
    200,
    true,
    "product details retrieved successfully",
    products
  );
});
const getProductsByCategory = catchAsync(
  async (req: Request, res: Response) => {
    const category = req.params.categoryname;
    console.log("running category: ", category);
    const products = await productService.getProductsByCategory(category);
    sendResponse(
      res,
      200,
      true,
      "related products retrieved successfully",
      products
    );
  }
);

export const productController = {
  createProduct,
  getProductsByStoreId,
  deleteProductById,
  getPopularProducts,
  getProductById,
  getProductsByCategory,
};
