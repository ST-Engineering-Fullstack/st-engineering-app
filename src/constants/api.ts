const API_BASE_URL = 'http://localhost:4000/api';

export const ENDPOINTS = {
    FILES: 'files',
    UPLOAD: 'upload',
    UPLOAD_MULTIPLE: 'upload/multiple',
    getCSVList() {
        return `${API_BASE_URL}/${this.FILES}`;
    },
    uploadCSV() {
        return `${API_BASE_URL}/${this.UPLOAD}`;
    },
    uploadMultipleCSV() {
        return `${API_BASE_URL}/${this.UPLOAD_MULTIPLE}`;
    },
}