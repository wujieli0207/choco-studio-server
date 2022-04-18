import { Inject, Provider } from '@nestjs/common';
import {
  DB_CONNECTION_TOKEN,
  DB_MODEL_TOKEN_SUFFIX,
} from '/@/constants/system.constant';
import { Connection } from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';

export interface TypegooseClass {
  new (...args: any[]);
}

export function getModelToken(modelName: string): string {
  return modelName + DB_MODEL_TOKEN_SUFFIX;
}

export function InjectModel(model: TypegooseClass) {
  return Inject(getModelToken(model.name));
}

// Get Provider by Class
export function getProviderByTypegooseClass(
  typegooseClass: TypegooseClass,
): Provider {
  return {
    provide: getModelToken(typegooseClass.name),
    useFactory: (connection: Connection) =>
      getModelForClass(typegooseClass, { existingConnection: connection }),
    inject: [DB_CONNECTION_TOKEN],
  };
}
