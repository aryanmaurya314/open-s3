import { Buckets } from '@/models/bucket';
import { Request, Response } from 'express';

const findAll = async (_req: Request, res: Response) => {
  const buckets = await Buckets().find().toArray();

  res.status(200).json({
    status: 'success',
    message: 'All the buckets fetched successfully.',
    result: buckets
  });
};

export default findAll;
