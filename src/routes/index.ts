import app from "../app";
import express from "express";
import authRoutes from "../modules/auth/auth.route";
import sellerRoutes from "../modules/seller/seller.route";
import userRoutes from "../modules/user/user.route";
import productRoutes from "../modules/product/product.route";
import orderRoutes from "../modules/order/order.route";

const router = express.Router();
const routes = [
  { path: "/auth", router: authRoutes },
  { path: "/seller", router: sellerRoutes },
  { path: "/user", router: userRoutes },
  { path: "/product", router: productRoutes },
  { path: "/order", router: orderRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
