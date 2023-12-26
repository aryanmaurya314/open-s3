import { db } from '@/dbContext';
import { Collection, WithId } from 'mongodb';
import { z } from 'zod';

export const Bucket = z
  .object({
    name: z.string().trim().min(1),
    createdAt: z.date().default(new Date())
  })
  .strict();

export type Bucket = z.infer<typeof Bucket>;
export type BucketWithId = WithId<Bucket>;
export const Buckets = () => db.collection('buckets') as Collection<Bucket>;
