import { Request, Response } from "express";
import { UserData } from "../../types/userDataType";
import User from "../../models/User";

const userUpdate = async (req: Request, res: Response) => {
  try {
    const userData: Partial<UserData> = req.body;
    const userId = parseInt(req.params.id);

    const [updateRowsCount, [updatedUser]] = await User.update(userData, {
      where: { id: userId },
      returning: true,
    });

    if (updateRowsCount === 0) {
      return res.status(404).send({ message: "No user found in the database" });
    }

    return res
      .status(200)
      .send([{ message: "Data successfully updated!" }, { updatedUser }]);
  } catch (error) {
    console.error(`Error updating user: ${error}`);

    return res.status(500).send({ message: "Error updating user!" });
  }
};

export default userUpdate;
