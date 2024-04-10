import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { productController } from "./product.controller";
import { sellerValidation } from "../seller/seller.validation";

const productRoutes = express.Router();

productRoutes.post(
  "/create",
  auth("seller"),
  //   validateRequest(sellerValidation.storeCreateSchema),
  productController.createProduct
);

export default productRoutes;
