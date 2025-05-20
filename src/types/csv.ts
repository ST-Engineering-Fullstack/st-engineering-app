export interface CSVData {
  [key: string]: string | number;
}

export interface UploadProgress {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress: number;
  message?: string;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
} 