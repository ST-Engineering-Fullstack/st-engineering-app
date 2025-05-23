
export const ENDPOINTS = {
    FILES: 'files',
    UPLOAD: 'upload',
    UPLOAD_MULTIPLE: 'upload/multiple',
    getCSVList() {
        return `/${this.FILES}`;
    },
    uploadCSV() {
        return `/${this.UPLOAD}`;
    },
    uploadMultipleCSV() {
        return `/${this.UPLOAD_MULTIPLE}`;
    },
}