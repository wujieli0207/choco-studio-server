import { merge } from 'lodash';
import type { Model, FilterQuery, QueryOptions, Document } from 'mongoose';

export interface PaginateResult<T> {
  documents: T[];
  total: number;
  page: number;
  perPage: number;
  totalPage: number;
}

export type PaginateQuery<T = any> = FilterQuery<T>;

export interface PaginateOptions {
  // 分页配置
  page?: number;
  perPage?: number;
  dateSort?: 1 | -1; // 1 升序，-1 降序
  projection?: string | object | null;
  // mongoose queryOptions
  sort?: QueryOptions['sort'];
  lean?: QueryOptions['lean'];
  populate?: QueryOptions['populate'];
  $queryOptions?: QueryOptions;
}

export interface PaginateModel<T extends Document> extends Model<T> {
  paginate(
    query?: PaginateQuery<T>,
    options?: PaginateOptions,
  ): Promise<PaginateResult<T>>;
}

const DEFAULT_OPTIONS: Required<
  Pick<PaginateOptions, 'page' | 'perPage' | 'dateSort' | 'lean'>
> = Object.freeze({
  page: 1,
  perPage: 10,
  dateSort: -1,
  lean: false,
});

export function paginate<T>(
  this: Model<T>,
  filterQuery: FilterQuery<T> = {},
  options: PaginateOptions = {},
) {
  const {
    page,
    perPage,
    dateSort,
    projection,
    $queryOptions,
    ...resetOptions
  } = merge({ ...DEFAULT_OPTIONS }, { ...options });

  const findQueryOptions = {
    ...resetOptions,
    ...$queryOptions,
  };

  const countQuery = this.countDocuments
    ? this.countDocuments(filterQuery).exec()
    : this.count(filterQuery).exec();
  const pageQuery = this.find(filterQuery, projection, {
    skip: (page - 1) * perPage,
    limit: perPage,
    sort: dateSort ? { _id: dateSort } : findQueryOptions.sort,
    ...findQueryOptions,
  });

  return Promise.all([countQuery, pageQuery]).then(
    ([countResult, PageResult]) => {
      const result: PaginateResult<T> = {
        documents: PageResult,
        total: countResult,
        page,
        perPage,
        totalPage: Math.ceil(countResult / perPage) || 1,
      };
      return result;
    },
  );
}
