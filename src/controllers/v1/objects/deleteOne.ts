import { Buckets } from '@/models/bucket';
import { Objects } from '@/models/object';
import { CustomError } from '@/utils';
import { Request, Response } from 'express';

const deleteOne = async (req: Request, res: Response) => {
  const { bucketName, objectKey } = req.params;

  const bucket = await Buckets().findOne({ name: bucketName });

  if (!bucket) {
    throw new CustomError(`Bucket '${bucketName}' not found.`, 404);
  }

  const { deletedCount } = await Objects().deleteOne({ bucketId: bucket._id, key: objectKey });

  if (!deletedCount) {
    throw new CustomError(`ObjectKey '${objectKey}' not found in bucket '${bucketName}'.`, 404);
  }

  res.status(200).json({
    status: 'success',
    message: `Object with objectKey '${objectKey}' deleted from bucket '${bucketName}' successfully.`
  });
};

export default deleteOne;
