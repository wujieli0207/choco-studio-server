import { argv } from 'yargs';

export const APP = {
  port: 8081,
};

export const MONGO_DB = {
  uri: (argv.db_uri as string) || 'mongodb://127.0.0.1:27017/ChocoStudio',
};
