import { Buckets } from '@/models/bucket';
import { CustomError } from '@/utils';
import { Request, Response } from 'express';

const deleteOne = async (req: Request, res: Response) => {
  const { bucketName } = req.params;

  const { deletedCount } = await Buckets().deleteOne({ name: bucketName });

  if (!deletedCount) {
    throw new CustomError(`Bucket '${bucketName}' not found.`, 404);
  }

  res.status(200).json({
    status: 'success',
    message: `Bucket '${bucketName}' deleted successfully.`
  });
};

export default deleteOne;
