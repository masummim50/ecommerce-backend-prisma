import express from "express";
import auth from "../../middleware/auth";
import { sellerController } from "./seller.controller";
import validateRequest from "../../middleware/validateRequest";
import { sellerValidation } from "./seller.validation";
import consoleroute from "../../middleware/consoleroute";

const sellerRoutes = express.Router();

sellerRoutes.get(
  "/store",
  consoleroute("hitting seller/store"),
  auth("seller"),
  sellerController.getStore
);
sellerRoutes.get("/:id", sellerController.getSellerById);
sellerRoutes.post(
  "/createstore",
  auth("seller"),
  validateRequest(sellerValidation.storeCreateSchema),
  sellerController.createStore
);

export default sellerRoutes;
