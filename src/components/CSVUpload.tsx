import { InboxOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Progress, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postCSVAPI, postMultipleCSVAPI } from '../apis/csv/csv';
import { CSV_UPLOAD_STATUS } from '../enum/csv/csv-upload-status.enum';
import type { CSVUploadProps, UploadProgress } from '../types/csv';

const { Dragger } = Upload;

interface ApiErrorResponse {
  message: string;
}

const CSVUpload: React.FC<CSVUploadProps> = () => {
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    status: CSV_UPLOAD_STATUS.IDLE,
    progress: 0,
  });

  const handleUpload = async (files: RcFile | RcFile[]): Promise<void> => {
    try {
      setUploadProgress({ status: CSV_UPLOAD_STATUS.UPLOADING, progress: 0 });

      if (Array.isArray(files)) {
        if (files.length === 1) {
          await postCSVAPI(files[0]);
        } else {
          await postMultipleCSVAPI(files);
        }
      } else {
        await postCSVAPI(files);
      }

      setUploadProgress({ status: CSV_UPLOAD_STATUS.SUCCESS, progress: 100 });
      toast.success('Upload successful!');
      queryClient.invalidateQueries({ queryKey: ['csvList'] });
    } catch (error) {
      let errMessage = 'Upload failed. Please try again.';
      if (error instanceof AxiosError && error.response?.data) {
        const errorData = error.response.data as ApiErrorResponse;
        if (errorData.message) {
          errMessage = errorData.message;
        }
      }
      setUploadProgress({
        status: CSV_UPLOAD_STATUS.ERROR,
        progress: 0,
        message: errMessage,
      });
      toast.error(errMessage);
    }
  };

  const props: UploadProps = {
    name: 'files',
    multiple: true,
    accept: '.csv',
    showUploadList: false,
    beforeUpload: (file, fileList) => {
      const invalidFile = fileList.find(
        (f) => f.type !== 'text/csv' && !f.name.endsWith('.csv')
      );
      if (invalidFile) {
        message.error('You can only upload CSV files!');
        return Upload.LIST_IGNORE;
      }

      if (file === fileList[fileList.length - 1]) {
        handleUpload(fileList);
      }

      return false;
    },
  };

  return (
    <div className="space-y-4">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag CSV files to this area to upload</p>
        <p className="ant-upload-hint">
          Support for single or multiple CSV file uploads. Strictly prohibited from uploading company data or other banned files.
        </p>
      </Dragger>

      {uploadProgress.status !== CSV_UPLOAD_STATUS.IDLE && (
        <div className="px-4">
          <Progress
            percent={uploadProgress.progress}
            status={uploadProgress.status === CSV_UPLOAD_STATUS.ERROR ? 'exception' : undefined}
            className="mb-2"
          />
          <p className="text-sm text-gray-600">
            {uploadProgress.status === CSV_UPLOAD_STATUS.UPLOADING && 'Uploading...'}
            {uploadProgress.status === CSV_UPLOAD_STATUS.SUCCESS && 'Upload complete!'}
            {uploadProgress.status === CSV_UPLOAD_STATUS.ERROR && uploadProgress.message}
          </p>
        </div>
      )}
    </div>
  );
};

export { CSVUpload };
