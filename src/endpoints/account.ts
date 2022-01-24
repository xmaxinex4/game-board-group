import { Express } from "express";
import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { PrismaClient } from ".prisma/client";

import { getCurrentUserId } from "../utils/get-current-user-id";
import { ActiveUserResponse, ActiveUserResponsePrismaSelect } from "../types/types";
import { compare, hash } from "bcrypt";

export const initializeAccountApi = (app: Express, prisma: PrismaClient, redisGet, redisSet, redisDelete, sgMail) => {
  // authenticated
  app.post("/api/account/edit", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma);

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

    const { username, color } = req.body;

    if (!username) {
      return res.status(400).json({ error: `Missing username value.` });
    }

    if (!color) {
      return res.status(400).json({ error: `Missing color value.` });
    }

    try {
      const result = await prisma.user.update({
        where: {
          id: userId.id
        },
        data: {
          username,
          color,
        },
        select: {
          ...ActiveUserResponsePrismaSelect
        }
      }) as ActiveUserResponse;

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error updating user account data: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  // authenticated
  app.post("/api/account/change-password", async (req, res) => {
    const userId = await getCurrentUserId(req, res, prisma);

    if (userId.error) {
      return res.status(401).json({ error: userId.error });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({ error: `Missing current password for verification.` });
    }

    if (!newPassword) {
      return res.status(400).json({ error: `Missing new password value.` });
    }

    try {
      const currentPasswordInDb = await prisma.user.findUnique({
        where: {
          id: userId.id
        },
        select: {
          password: true
        }
      });

      const passwordValid = await compare(currentPassword, currentPasswordInDb.password);

      if (!passwordValid) {
        return res.status(401).json({ error: `Current password is incorrect.` });
      }

      const newHashedPassword = await hash(newPassword, 10);

      const result = await prisma.user.update({
        where: {
          id: userId.id
        },
        data: {
          password: newHashedPassword
        },
        select: {
          ...ActiveUserResponsePrismaSelect
        }
      }) as ActiveUserResponse;

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error updating user password: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.post("/api/account/activate", async (req, res) => {
    const { activationCode } = req.body;

    if (!activationCode || !activationCode.toString()) {
      return res.status(400).json({ error: `Missing activation code.` });
    }

    let userEmail = await redisGet(activationCode.toString());
    userEmail = userEmail?.toString() && userEmail.toString().toLowerCase().replace("account-verification-", "");;

    if (!userEmail) {
      console.log("Failed to get redis key for activation code; code not found in Redis.");
      return res.status(400).json({ error: `Link Expired` });
    };

    try {
      const activatedUser = await prisma.user.update({
        where: {
          email: userEmail.toLowerCase(),
        },
        data: {
          isActive: true,
        },
        select: {
          ...ActiveUserResponsePrismaSelect
        }
      }) as ActiveUserResponse;

      if (!activatedUser) {
        return res.status(400).json({ error: `Failed to activate user.` });
      };

      await redisDelete(activationCode.toString());

      const token = sign({ userId: activatedUser.id }, process.env.APP_SECRET);
      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error activating account: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.post("/api/account/resend-verification-email", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: `Missing email` });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      });

      if (!user) {
        // return success even though an email is not confirmed
        // so we don't tell the user if it is a valid email or not
        return res.status(201).json();
      }

      const existingLinkForEmail = await redisGet(`account-verification-${email.toLowerCase()}`);

      if (existingLinkForEmail) {
        await redisDelete(existingLinkForEmail);
      }

      // save link in redis
      let uniqueKeyFound = false;
      let accountActivationCode = "";

      while (!uniqueKeyFound) {
        let possibleKey = uuidv4().split("-")[0];
        let keyInRedis = await redisGet(possibleKey);
        if (!keyInRedis) { // making sure key is unique
          accountActivationCode = possibleKey;
          uniqueKeyFound = true;
        }
      }

      const oneDayTtl = 24 * 60 * 60;

      const setAccountActivationCode = await redisSet(accountActivationCode, `account-verification-${user.email.toLowerCase()}`, "EX", oneDayTtl);

      if (!setAccountActivationCode) {
        console.log("Error setting redis key for account activation");
        return res.status(400).json({ error: `Unable to send account activation link.` });
      }

      // send email using send grid with link code
      const msg = {
        to: user.email,
        from: "gameboardgroup@gameboardgroup.com",
        template_id: "d-af84d37dfa06434a9b711b814ef6334d",
        html: "test", // todo: might break things, test email
        dynamicTemplateData: {
          name: user.username,
          code: accountActivationCode,
        },
      };
      sgMail
        .send(msg)
        .then(() => {
          return res.status(201).json();
        })
        .catch((error) => {
          return res.status(500).json({ error: `Something went wrong. Please try again.` });
        });

      return res.status(201).json();
    } catch (error) {
      console.error("Error on resending activate account email: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.post("/api/account/is-active-reset-password-link", async (req, res) => {
    const { resetPasswordCode } = req.body;

    if (!resetPasswordCode || !resetPasswordCode.toString()) {
      return res.status(400).json({ error: `Missing reset password code to check.` });
    }

    let userEmail = await redisGet(resetPasswordCode.toString());
    userEmail = userEmail?.toString() && userEmail.toString().toLowerCase().replace("reset-password-", "");

    if (!userEmail) {
      console.log("Failed to get redis key for reset password code; code not found in Redis.");
      return res.status(400).json({ error: `Link Expired` });
    } else {
      return res.status(200).json();
    }
  });

  app.post("/api/account/reset-password", async (req, res) => {
    const { resetPasswordCode, newPassword } = req.body;

    if (!resetPasswordCode || !resetPasswordCode.toString()) {
      return res.status(400).json({ error: `Missing reset password code.` });
    }

    if (!newPassword || !newPassword.toString()) {
      return res.status(400).json({ error: `Missing new password.` });
    }

    let userEmail = await redisGet(resetPasswordCode.toString());
    userEmail = userEmail?.toString() && userEmail.toString().toLowerCase().replace("reset-password-", "");

    if (!userEmail) {
      console.log("Failed to get redis key for reset password code; code not found in Redis.");
      return res.status(400).json({ error: `Link Expired` });
    };

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail.toLowerCase(),
        },
      });

      if (!user) {
        return res.status(400).json({ error: `Link Expired` });
      }

      const newHashedPassword = await hash(newPassword, 10);

      // set isActive to true because email is confirmed to get to this endpoint
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isActive: true,
          password: newHashedPassword,
        },
        select: {
          ...ActiveUserResponsePrismaSelect
        }
      }) as ActiveUserResponse;

      await redisDelete(resetPasswordCode.toString());

      return res.status(200).json();
    } catch (error) {
      console.error("Error resetting password: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });

  app.post("/api/account/send-reset-password-email", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: `Missing email` });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email.toLowerCase()
        },
      });

      if (!user) {
        // return success even though an email is not confirmed
        // so we don't tell the user if it is a valid email or not
        return res.status(201).json();
      }

      const existingLinkForEmail = await redisGet(`reset-password-${email.toLowerCase()}`);

      if (existingLinkForEmail) {
        await redisDelete(existingLinkForEmail);
      }

      // save link in redis
      let uniqueKeyFound = false;
      let resetPasswordCode = "";

      while (!uniqueKeyFound) {
        let possibleKey = uuidv4().split("-")[0];
        let keyInRedis = await redisGet(possibleKey);
        if (!keyInRedis) { // making sure key is unique
          resetPasswordCode = possibleKey;
          uniqueKeyFound = true;
        }
      }

      const oneDayTtl = 24 * 60 * 60;

      const setResetPasswordCode = await redisSet(resetPasswordCode, `reset-password-${user.email.toLowerCase()}`, "EX", oneDayTtl);

      if (!setResetPasswordCode) {
        console.log("Error setting redis key for reset password");
        return res.status(400).json({ error: `Unable to send reset password link.` });
      }

      // send email using send grid with link code
      const msg = {
        to: user.email,
        from: "gameboardgroup@gameboardgroup.com",
        template_id: "d-cbb98967e2004d05b0774c5c1f6ed180",
        html: "test", // todo: might break things, test email
        dynamicTemplateData: {
          name: user.username,
          code: resetPasswordCode,
        },
      };
      sgMail
        .send(msg)
        .then(() => {
          return res.status(201).json();
        })
        .catch((error) => {
          return res.status(500).json({ error: `Something went wrong. Please try again.` });
        });

      return res.status(201).json();
    } catch (error) {
      console.error("Error on sending reset password email: ", error);
      return res.status(500).json({ error: `Something went wrong. Please try again.` });
    }
  });
};
