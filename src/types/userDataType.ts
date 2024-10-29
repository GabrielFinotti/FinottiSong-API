export type UserData = {
  username: string;
  email: string;
  password: string;
  isPremium: boolean;
  profilePhoto?: string;
  realName: string;
  role: "dev" | "user";
};
