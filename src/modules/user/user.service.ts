import ApiError from "../../shared/apiError";
import excludeField from "../../shared/excludeField";
import prisma from "../../shared/prisma";
import { userType } from "./user.interface";

const getUserById = async (
  userId: string
): Promise<Partial<userType>> => {
  console.log("userservice");
  const result = await prisma.user.findUnique({ where: { id: userId } });
  console.log('result: ', result)
  if (result) {
    console.log("result: ", result);
    const user = excludeField(result, ["password"]);
    return user;
  }else{
    throw new ApiError(400, "user not found")
  }
};

export const userService = {
  getUserById,
};
