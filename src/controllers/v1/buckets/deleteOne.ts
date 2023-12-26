import { Buckets } from '@/models/bucket';
import { Objects } from '@/models/object';
import { CustomError } from '@/utils';
import { Request, Response } from 'express';

const deleteOne = async (req: Request, res: Response) => {
  const { bucketName } = req.params;

  // check if bucket present
  const bucket = await Buckets().findOne({ name: bucketName });

  if (!bucket) {
    throw new CustomError(`Bucket '${bucketName}' not found.`, 404);
  }

  // delete bucket and related objects
  await Objects().deleteMany({ bucketId: bucket._id });
  await Buckets().deleteOne({ name: bucketName });

  res.status(200).json({
    status: 'success',
    message: `Bucket '${bucketName}' deleted successfully.`
  });
};

export default deleteOne;
