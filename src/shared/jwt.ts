import jwt from "jsonwebtoken";

type JwtPayload = {
    id: string;
    name: string;
    email: string;
    role: string;
};
const generateToken = (data: any) => {
  const token = jwt.sign(data, process.env.jwt_secret_key as string, {
    expiresIn: "365days",
  });
  return token;
};

const verifyToken = (token:string):JwtPayload=> {
    const decoded = jwt.verify(token, process.env.jwt_secret_key as string) as JwtPayload;
    return decoded;
}

export const jwtFunctions = {
  generateToken,
  verifyToken
};
