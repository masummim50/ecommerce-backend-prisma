import { connect } from "http2";
import ApiError from "../../shared/apiError";
import excludeField from "../../shared/excludeField";
import prisma from "../../shared/prisma";
import { sellerType } from "./seller.interface";

const getSellerById = async (
  sellerId: string
): Promise<Partial<sellerType>> => {
  const result: sellerType | null = await prisma.seller.findUnique({
    where: { id: sellerId },
  });
  if (result) {
    const seller = excludeField(result, ["password"]);
    return seller;
  } else {
    throw new ApiError(400, "seller not found");
  }
};

const createStore = async (sellerId: string, storeData: any) => {
  const result = await prisma.store.create({
    data: { ...storeData, seller: { connect: { id: sellerId } } },
  });

  console.log("store created: ", result);
  return result;
};

const getStore = async (sellerId: string) => {
  const store = await prisma.store.findFirst({
    where: { sellerId: sellerId },
  });
  return store;
};

export const sellerService = {
  getSellerById,
  createStore,
  getStore,
};
