import { UserData } from "../../types/userDataType";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateUserCredentials = async (userData: UserData) => {
  const infoGroup: string[] = [];

  try {
    if (userData.username.trim() !== userData.username) {
      infoGroup.push("Username cannot contain leading or trailing spaces.");
    }
    if (userData.email.trim() !== userData.email) {
      infoGroup.push("Email cannot contain leading or trailing spaces.");
    }
    if (userData.password.trim() !== userData.password) {
      infoGroup.push("Password cannot contain leading or trailing spaces.");
    }
    if (userData.realName.trim() !== userData.realName) {
      infoGroup.push("Real name cannot contain leading or trailing spaces.");
    }

    if (userData.username.length < 4 || userData.username.length > 12) {
      infoGroup.push("Username must be between 4 and 12 characters.");
    }
    if (userData.password.length < 12 || userData.password.length > 20) {
      infoGroup.push("Password must be between 12 and 20 characters.");
    }

    if (!emailRegex.test(userData.email)) {
      infoGroup.push("Please enter a valid email address.");
    }

    if (userData.role !== "dev" && userData.role !== "user") {
      infoGroup.push("User role must be either 'dev' or 'user'.");
    }

    return infoGroup.length > 0 ? infoGroup : true;
  } catch (error) {
    console.error(`Error validating credentials: ${error}`);

    return ["Error validating the information."];
  }
};

export default validateUserCredentials;
