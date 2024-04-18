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
  const products = await prisma.product.findMany({ where: { storeId } });
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
  const products = await prisma.product.delete({ where: { id: productId } });
  return products;
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

const getProductsByCategory = async (category: string) => {
  const products = await prisma.product.findMany({
    where: { category: category },
  });
  return products;
};

export const productService = {
  createProduct,
  getProductsByStoreId,
  deleteProductById,
  getPopularProducts,
  getProductById,
  getProductsByCategory,
};
