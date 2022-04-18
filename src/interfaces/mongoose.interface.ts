import type { Model, Types } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';

export type MongooseDoc<T> = Omit<DocumentType<T>, '_id' | 'id'> &
  T & { _id: Types.ObjectId };
export type MongooseModel<T> = Model<T>;

export type MongooseID = Types.ObjectId | string;
