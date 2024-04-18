import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { productController } from "./product.controller";
import { sellerValidation } from "../seller/seller.validation";

const productRoutes = express.Router();

productRoutes.get("/popular", productController.getPopularProducts);
productRoutes.get(
  "/category/:categoryname",
  productController.getProductsByCategory
);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post(
  "/create",
  auth("seller"),
  //   validateRequest(sellerValidation.storeCreateSchema),
  productController.createProduct
);
productRoutes.get(
  "/store/:id",
  //   validateRequest(sellerValidation.storeCreateSchema),
  productController.getProductsByStoreId
);
productRoutes.delete(
  "/:id",
  //   validateRequest(sellerValidation.storeCreateSchema),
  productController.deleteProductById
);

export default productRoutes;
