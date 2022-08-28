import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { createProfile, findProfileByDNI } from "../model";
import { validateToken } from "./utils";

export const createProfileController = async (req: Request, res: Response) => {
  const profile = req.body as Prisma.ProfileCreateInput;

  const profileDB = await findProfileByDNI(profile.dni);

  if (profileDB) {
    return res.status(409).json({
      error: true,
      message: `DNI ${profileDB.dni} already exist!`,
    });
  }

  if (!Object.keys(profile).length) {
    return res.status(404).json({
      error: true,
      message: "Body not found",
    });
  }

  if (!profile.dni) {
    return res.json({
      error: true,
      message: "Please provide your DNI",
    });
  }
  if (profile.dni.toString().length !== 8) {
    return res.json({
      error: true,
      message: "DNI must have 8 digits",
    });
  }
  try {
    const id = validateToken(req.headers.authorization!);

    const created = await createProfile({
      age: profile.age,
      dni: profile.dni,
      fullName: profile.fullName,
      birthDate: new Date(profile.birthDate),
      gender: profile.gender,
      user: { connect: { id } },
    });

    return res.json({
      error: false,
      message: "Success",
      data: created,
    });
  } catch (e) {
    return res.json(e);
  }
};
