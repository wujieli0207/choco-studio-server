import path from 'path';
import { argv } from 'yargs';

// const packageJSON = require(path.resolve(ROOT_PATH, 'package.json'));

export const APP = {
  port: 8081,
};

export const MONGO_DB = {
  uri: (argv.db_uri as string) || 'mongodb://127.0.0.1:27017/ChocoStudio',
};
