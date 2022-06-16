import { Color } from "@prisma/client";

export type CreateUserFormModel = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  color: Color;
};
