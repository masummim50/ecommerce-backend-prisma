import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { orderController } from "./order.controller";

const orderRoutes = express.Router();

orderRoutes.get(
  "/",
  auth("seller"),
  //   validateRequest(sellerValidation.storeCreateSchema),
  orderController.getOrdersBySellerId
);
orderRoutes.post(
  "/create-order",
  auth("customer"),
  //   validateRequest(sellerValidation.storeCreateSchema),
  orderController.createOrder
);
orderRoutes.get(
  "/:id",
  auth("customer", "seller"),
  //   validateRequest(sellerValidation.storeCreateSchema),
  orderController.getOrderDetails
);

export default orderRoutes;
