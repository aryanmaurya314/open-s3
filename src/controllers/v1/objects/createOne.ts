import { Buckets } from '@/models/bucket';
import { Objects } from '@/models/object';
import { CustomError } from '@/utils';
import { Request, Response } from 'express';
import { Binary } from 'mongodb';

const createOne = async (req: Request, res: Response) => {
  const { bucketName, objectKey } = req.params;

  const bucket = await Buckets().findOne({ name: bucketName });

  if (!bucket) {
    throw new CustomError(`Bucket '${bucketName}' not found.`, 404);
  }

  const object = req.file;

  if (!object) {
    throw new CustomError('Please upload a valid object.', 400);
  }

  const { originalname, mimetype, buffer } = object;
  const fileBinary = new Binary(buffer);

  const existingObject = await Objects().findOne({ bucketId: bucket._id, key: objectKey });

  if (existingObject) {
    await Objects().updateOne(
      { bucketId: bucket._id, key: objectKey },
      { $set: { name: originalname, mimeType: mimetype, data: fileBinary, updatedAt: new Date() } }
    );

    return res.status(200).json({
      status: 'success',
      message: `ObjectKey '${objectKey}' found, object '${originalname}' updated successfully.`
    });
  }

  await Objects().insertOne({
    bucketId: bucket._id,
    key: objectKey,
    name: originalname,
    mimeType: mimetype,
    data: fileBinary,
    createdAt: new Date()
  });

  return res.status(201).json({
    status: 'success',
    message: `Object '${originalname}' uploaded successfully.`
  });
};

export default createOne;
