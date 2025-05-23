const API_BASE_URL = import.meta.env.VITE_API_URL;

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