export const DB_CONNECTION_TOKEN = 'DBConnectionToken';
export const DB_MODEL_TOKEN_SUFFIX = 'ModelToken';

// 数据是否存在
export enum rcStateEnum {
  Exist = 'E',
  Deleted = 'D',
}

export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = 'success',
}
