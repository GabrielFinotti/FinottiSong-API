import { Request, Response } from "express";
import { UserData } from "../../types/userDataType";
import bcrypt from "bcrypt";
import User from "../../models/User";
import createAuthToken from "../../utils/auth/createAuthToken";

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password }: UserData = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(404).send({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Incorrect password!" });
    }

    const token = await createAuthToken(existingUser.id);

    return res.status(200).send({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(`An error occurred while trying to login: ${error}`);

    return res
      .status(500)
      .send({ message: "An internal error occurred, try again later!" });
  }
};

export default userLogin;
