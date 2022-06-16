import { Color } from "@prisma/client";

export type EditAccountFormModel = {
  username: string;
  color: Color;
};
