import { Bucket, Buckets } from '@/models/bucket';
import { CustomError } from '@/utils';
import { Request, Response } from 'express';

const createOne = async (req: Request<unknown, unknown, Bucket>, res: Response) => {
  const bucketName = req.body.name;

  const existingBucket = await Buckets().findOne({ name: bucketName });

  if (existingBucket) {
    throw new CustomError(`Bucket '${bucketName}' already exists.`, 400);
  }

  await Buckets().insertOne(req.body);

  res.status(201).json({
    status: 'success',
    message: `Bucket '${bucketName}' created successfully.`
  });
};

export default createOne;
