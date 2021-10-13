import { User } from ".prisma/client";

export type CreateUserFormModel = Partial<User> & {
  confirmPassword: string;
};