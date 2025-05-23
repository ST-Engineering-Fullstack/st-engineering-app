import type { CSV } from "../apis/csv/response/csv.response";
import { CSV_UPLOAD_STATUS } from "../enum/csv/csv-upload-status.enum";

export interface CSVData {
  [key: string]: string | number;
}

export interface UploadProgress {
  status: CSV_UPLOAD_STATUS.IDLE | CSV_UPLOAD_STATUS.UPLOADING | CSV_UPLOAD_STATUS.SUCCESS | CSV_UPLOAD_STATUS.ERROR;
  progress: number;
  message?: string;
}
export interface CSVUploadProps {
  onDataLoaded?: (file: CSV) => void;
}