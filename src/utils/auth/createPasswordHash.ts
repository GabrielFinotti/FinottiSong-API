import bcrypt from "bcrypt";

const passwordHash = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
  } catch (error) {
    console.error(`Error trying to hash the password: ${error}`);

    throw new Error("An error occurred while processing the password!");
  }
};

export default passwordHash;
