export type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export { default as createUser } from "./create";
export { default as updatePassword } from "./updatePassword";
export { default as login } from "./login";
