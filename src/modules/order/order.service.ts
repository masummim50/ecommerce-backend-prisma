import { Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";

const createOrder = async (items: any, userId: string) => {
  console.log("create order service: ", items);

  // for (const [key, value] of Object.entries(items)) {

  // }
  for (const [key, value] of Object.entries(items)) {
    let paymentAmount = 50;
    let orders = [];
    value.forEach((v) => {
      paymentAmount = paymentAmount + v.price * v.quantity;
      orders.push({
        productId: v.id,
        productName: v.name,
        productPrice: v.price,
        productQuantity: v.quantity,
        productImages: [...v.images],
        storeId: v.storeId,
      });
    });
    const newOrder = await prisma.order.create({
      data: {
        storeId: key,
        paymentAmount: paymentAmount,
        userId: userId,
        items: orders,
      },
    });
  }
  return true;
};

const getOrderDetails = async (
  orderId: string,
  role: "customer" | "seller"
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { Store: true },
  });
  const arrayOfProductId: string[] = [];
  if (
    order?.items &&
    typeof order.items === "object" &&
    Array.isArray(order.items)
  ) {
    const itemsArray = order.items as Prisma.JsonArray;
    itemsArray.forEach((item) => {
      if (typeof item === "object" && item && "productId" in item) {
        arrayOfProductId.push(item.productId as string);
      }
    });
  }

  console.log("product ids: ", arrayOfProductId);

  if (role === "seller") {
    const products = await prisma.product.findMany({
      where: { id: { in: arrayOfProductId } },
      select: { id: true, stock: true },
    });
    console.log("those products: ", products);
    const reformed: any = {};
    products.forEach((product) => {
      reformed[product.id] = product.stock;
    });
    return { order, stock: reformed };
  }
  return order;
};

const getOrdersBySellerId = async (sellerId: string) => {
  const orders = await prisma.order.findMany({
    where: { Store: { sellerId } },
  });
  return orders;
};

export const orderService = {
  createOrder,
  getOrderDetails,
  getOrdersBySellerId,
};
