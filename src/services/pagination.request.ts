export type PaginationParamsREQ = {
  limit: number;
  total: number;
  totalPages: number;
  searchKeyword?: string;
  pageSize: number;
};
