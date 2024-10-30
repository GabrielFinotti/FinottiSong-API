import { Request, Response } from "express";
import { UserData } from "../../types/userDataType";
import validateUserCredentials from "../../utils/validations/validateUserCredentials";
import User from "../../models/User";
import { Op } from "sequelize";
import passwordHash from "../../utils/auth/createPasswordHash";

const userRegister = async (req: Request, res: Response) => {
  try {
    const userData: UserData = req.body;
    const response = await validateUserCredentials(userData);

    if (typeof response !== "boolean") {
      return res.status(400).send({ message: response });
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: userData.username }, { email: userData.email }],
      },
    });

    if (existingUser) {
      return res.status(409).send({
        message:
          "Username or email is already in use. Please, choose another one!",
      });
    }

    const { role } = userData;
    userData.isPremium = role === "dev";

    userData.password = await passwordHash(userData.password);

    await User.create(userData);

    return res.status(201).send({ message: "Successful registration" });
  } catch (error) {
    console.error(`Error registering user: ${error}`.bgBlack.red);

    return res.status(500).send({ message: "Error registering user!" });
  }
};

export default userRegister;
