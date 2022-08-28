import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { createUser } from "../model";
import bcrypt from "bcryptjs";
import { findByUsername } from "../model";

export const signIn = async (req: Request, res: Response) => {
  const user = req.body as Prisma.UserCreateInput;
  const dbUser = await findByUsername(user.username);

  if (!user.password)
    return res.json({
      error: true,
      message: "Password can not be empty",
    });
  if (!user.username)
    return res.json({
      error: true,
      message: "Username can not be empty",
    });

  if (dbUser) {
    const validUsername = user.username === dbUser?.username;

    if (validUsername)
      return res.json({
        error: true,
        message: "Username already exist",
      });
  }

  const salt = bcrypt.genSaltSync();

  const hashPassword = bcrypt.hashSync(user.password, salt);

  await createUser({ ...user, password: hashPassword });

  res.json({
    error: false,
    message: "User created",
  });
};
