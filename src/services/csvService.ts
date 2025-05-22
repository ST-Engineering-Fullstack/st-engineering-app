import axios from 'axios';
import type { CSVData } from '../types/csv';

const API_BASE_URL = '/api';

export const csvService = {
  async uploadCSV(file: File, onProgress: (progress: number) => void): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    await axios.post(`${API_BASE_URL}/csv/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        onProgress(progress);
      },
    });
  },

  async getCSVData(params: {
    page: number;
    pageSize: number;
    search?: string;
  }): Promise<{ data: CSVData[]; total: number }> {
    const { data } = await axios.get(`${API_BASE_URL}/csv/data`, { params });
    return data;
  },

  async validateCSV(file: File): Promise<{ isValid: boolean; errors: string[] }> {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post(`${API_BASE_URL}/csv/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
}; 