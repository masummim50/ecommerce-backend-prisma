import { connect } from "http2";
import ApiError from "../../shared/apiError";
import excludeField from "../../shared/excludeField";
import prisma from "../../shared/prisma";

const createProduct = async (sellerId: string, productData: any) => {
  const store = await prisma.store.findFirst({ where: { sellerId: sellerId } });
  console.log("store found: ", store);
  const result = await prisma.product.create({
    data: { ...productData, store: { connect: { id: store?.id } } },
  });

  console.log("new product created: ", result);
  return result;
};

const getProductsByStoreId = async (storeId: string) => {
  const products = await prisma.product.findMany({
    where: { storeId },
    orderBy: { updatedAt: "desc" },
  });
  return products;
};

const getProductById = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { store: true },
  });
  return product;
};

const deleteProductById = async (productId: string) => {
  const deleteCartItems = await prisma.cartItem.deleteMany({
    where: { productId: productId },
  });
  const products = await prisma.product.delete({ where: { id: productId } });
  console.log("delete products: ", products);
  return products;
};
const updateProductById = async (
  productId: string,
  sellerId: string,
  data: any
) => {
  const update = await prisma.product.update({
    where: { id: productId },
    data,
  });
  return update;
};

const getPopularProducts = async () => {
  const products = await prisma.product.findMany({
    take: 10,
    orderBy: {
      sales: "desc",
    },
    include: {
      reviews: true,
    },
  });
  return products;
};

const getNewestProducts = async () => {
  const products = await prisma.product.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      reviews: true,
    },
  });
  return products;
};

const getProductsByCategory = async (category: string) => {
  const products = await prisma.product.findMany({
    where: { category: category },
  });
  return products;
};

const addProductToCart = async (userId: string, productId: string) => {
  const addedResult = await prisma.cartItem.upsert({
    where: {
      userId_productId: {
        userId: userId,
        productId: productId,
      },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      userId: userId,
      productId: productId,
      quantity: 1,
    },
  });
  return addedResult;
};

const increaseCart = async (cartItemId: string) => {
  const result = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: { increment: 1 } },
  });
  return result;
};

const decreaseCart = async (cartItemId: string) => {
  const result = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: { decrement: 1 } },
  });
  return result;
};

const getCartItems = async (userId: string) => {
  const products = await prisma.cartItem.findMany({
    where: { userId: userId },
    include: {
      product: {
        include: { store: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
  return products;
};

const getProductDetailsForSeller = async (productId: string) => {
  console.log("new api hitting");
  const product = await prisma.product.findFirst({
    where: { id: productId },
    include: {
      reviews: { include: { user: { select: { name: true } } } },
    },
  });
  return product;
};

export const productService = {
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
  getProductDetailsForSeller,
};
