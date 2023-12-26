import { db } from '@/dbContext';
import { Binary, Collection, ObjectId, WithId } from 'mongodb';

export interface IObject {
  bucketId: ObjectId;
  key: string;
  name: string;
  data: Binary;
  mimeType: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type ObjectWithId = WithId<IObject>;
export const Objects = () => db.collection('objects') as Collection<IObject>;
