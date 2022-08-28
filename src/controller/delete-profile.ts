import { Request, Response } from 'express';
import {
  deleteProfile,
  findProfileByUserId
} from '../model';
import { validateToken } from './utils';

export const deleteProfileController = async (
  req: Request,
  res: Response
) => {
  const id = validateToken(req.headers.authorization!);
  const profile = await findProfileByUserId(id);

  if (!profile)
    return res.json({
      error: true,
      message: 'Not profiles found for this user'
    });

  try {
    await deleteProfile(profile?.id);

    return res.status(204).json({
      error: false,
      message: 'Profile deleted successfully'
    });
  } catch (e) {
    return res.json({
      error: true,
      message: 'Failed',
      data: e
    });
  }
};
