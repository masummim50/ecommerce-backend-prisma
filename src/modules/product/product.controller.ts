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

const updateProductById = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;
  const data = req.body;
  const seller = (req as any).user.id;

  const products = await productService.updateProductById(
    productId,
    seller,
    data
  );
  sendResponse(res, 200, true, "product updated successfully", products);
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
const getNewestProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await productService.getNewestProducts();
  sendResponse(res, 200, true, "new products retrieved successfully", products);
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

const addProductToCart = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;
  const userId = (req as any).user.id;
  const products = await productService.addProductToCart(userId, productId);
  sendResponse(res, 200, true, "Product added to cart successfully", products);
});

const getCartItems = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const products = await productService.getCartItems(userId);
  sendResponse(res, 200, true, "cart retrieved successfully", products);
});
const increaseCart = catchAsync(async (req: Request, res: Response) => {
  const cartItemId = req.params.id;
  const products = await productService.increaseCart(cartItemId);
  sendResponse(res, 200, true, "cart increased successfully", products);
});
const decreaseCart = catchAsync(async (req: Request, res: Response) => {
  const cartItemId = req.params.id;
  const products = await productService.decreaseCart(cartItemId);
  sendResponse(res, 200, true, "cart decreased successfully", products);
});

export const productController = {
  createProduct,
  getProductsByStoreId,
  deleteProductById,
  getPopularProducts,
  getProductById,
  getProductsByCategory,
  addProductToCart,
  getCartItems,
  increaseCart,
  decreaseCart,
  getNewestProducts,
  updateProductById,
};
