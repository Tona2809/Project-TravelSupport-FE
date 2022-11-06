export interface SearchParams {
  searchText?: string;
  pageIndex: number;
  pageSize: number;
  status?: string;
  sortBy?: string;
  ascending?: boolean;

  [key: string]: any;
}

export interface ListResponse<T> {
  content: T[];
  pageable?: {
    pageNumber: number;
    pageSize: number;
  };
  last?: boolean;
  totalPages?: number;
  totalElements?: number;
  size?: number;
  number?: number;
  first?: boolean;
  numberOfElements?: number;
  empty?: boolean;
}

export interface DeleteType<T> {
  id: T | T[];
}
