export type CSV = {
    _id: string;
    originalName: string;
    filename: string;
    mimeType: string;
    size: number;
    uploadedAt: string;
};

export type Pagination = {
    total: number;
    pageSize: number;
    limit: number;
    totalPages: number;
    currentPage: number
};

export type CSVListRESP = {
    data: {
        files: CSV[]
    } & Pagination;
};

export type CSVUploadRESP = {
    message: string;
    file: CSV;
}