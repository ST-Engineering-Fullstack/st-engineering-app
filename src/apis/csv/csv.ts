import { ENDPOINTS } from "../../constants/api";
import { Axios } from "../../utils/axios";
import type { CsvListREQ } from "./request/csv.request";
import type { CSVListRESP, CSVUploadRESP } from "./response/csv.response";

export const getCSVListAPI = (
  params: CsvListREQ
): Promise<CSVListRESP> =>
  Axios.get(ENDPOINTS.getCSVList(), { params });
export const postCSVAPI = async (file: File): Promise<CSVUploadRESP> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await Axios.post<CSVUploadRESP>(ENDPOINTS.uploadCSV(), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};


export const postMultipleCSVAPI = async (files: File[]): Promise<CSVUploadRESP> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  const res = await Axios.post<CSVUploadRESP>(ENDPOINTS.uploadMultipleCSV(), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};