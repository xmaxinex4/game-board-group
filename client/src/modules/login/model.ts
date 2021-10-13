import { User } from ".prisma/client";

export type LoginFormModel = Pick<User, "email" | "password">;
