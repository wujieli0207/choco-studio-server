export type ResponseMessage = string;
export enum ResponseStatus {
  Error = 'error',
  Succcess = 'success',
}

export interface HttpResponseBase {
  status: ResponseStatus;
  message: ResponseMessage;
}

export type ExceptionInfo =
  | ResponseMessage
  | {
      message: ResponseMessage;
      error?: any;
    };

export interface HttpPaginateResult<T> {
  data: T;
  pagination: {
    total: number;
    currentPage: number;
    totalPage: number;
    perPage: number;
  };
}

export type HttpResponseError = HttpResponseBase & {
  error: any;
  debug?: string;
};

export type HttpResponseSuccess<T> = HttpResponseBase & {
  params?: any;
  result: T | HttpPaginateResult<T>;
};

export type HttpResponse<T> = HttpResponseError | HttpResponseSuccess<T>;
