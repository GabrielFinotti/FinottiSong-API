import jwt from "jsonwebtoken";

const createAuthToken = async (userId: number) => {
  try {
    const payload: jwt.JwtPayload = {
      userId,
    };

    const options: jwt.SignOptions = {
      expiresIn: "30d",
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, options);

    return token;
  } catch (error) {
    console.error(`Error when generating authentication token: ${error}`);

    throw Error("Error when generating authentication token!");
  }
};

export default createAuthToken;
