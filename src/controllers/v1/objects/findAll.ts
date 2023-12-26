import { Buckets } from '@/models/bucket';
import { Objects } from '@/models/object';
import { CustomError } from '@/utils';
import { Request, Response } from 'express';

const findAll = async (req: Request, res: Response) => {
  const { bucketName } = req.params;
  const bucket = await Buckets().findOne({ name: bucketName });

  if (!bucket) {
    throw new CustomError(`Bucket '${bucketName}' not found.`, 404);
  }

  const objects = await Objects()
    .find({ bucketId: bucket._id })
    .project({ key: 1, name: 1, createdAt: 1, updatedAt: 1 })
    .toArray();

  res.status(200).json({
    status: 'success',
    message: `Objects of bucket '${bucketName}' fetched successfully.`,
    result: objects
  });
};

export default findAll;
