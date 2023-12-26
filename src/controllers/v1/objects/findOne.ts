import { Buckets } from '@/models/bucket';
import { Objects } from '@/models/object';
import { CustomError } from '@/utils';
import { Request, Response } from 'express';

const findOne = async (req: Request, res: Response) => {
  const { bucketName, objectKey } = req.params;
  const bucket = await Buckets().findOne({ name: bucketName });

  if (!bucket) {
    throw new CustomError(`Bucket '${bucketName}' not found.`, 404);
  }

  const object = await Objects().findOne({ bucketId: bucket._id, key: objectKey });

  if (!object) {
    throw new CustomError(`Object '${objectKey}' not found in bucket '${bucketName}'.`, 404);
  }

  res.setHeader('Content-Type', object.mimeType);
  res.set('Content-Disposition', `attachment; filename="${object.name}"`);

  res.status(200).send(object.data.buffer);
};

export default findOne;
