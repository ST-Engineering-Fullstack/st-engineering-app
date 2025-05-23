import { InboxOutlined } from '@ant-design/icons';
import { Progress, Upload, message } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postCSVAPI, postMultipleCSVAPI } from '../apis/csv/csv';
import type { CSVUploadProps, UploadProgress } from '../types/csv';

const { Dragger } = Upload;

const CSVUpload: React.FC<CSVUploadProps> = () => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    status: 'idle',
    progress: 0,
  });

  const handleUpload = async (files: RcFile | RcFile[]): Promise<void> => {
    try {
      setUploadProgress({ status: 'uploading', progress: 0 });

      if (Array.isArray(files)) {
        if (files.length === 1) {
          await postCSVAPI(files[0]);
        } else {
          await postMultipleCSVAPI(files);
        }
      } else {
        await postCSVAPI(files);
      }

      setUploadProgress({ status: 'success', progress: 100 });
      toast.success('Upload successful!');
    } catch (error) {
      let errMessage = 'Upload failed. Please try again.';
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error).response?.data?.message === 'string'
      ) {
        errMessage = (error).response.data.message;
      }
      setUploadProgress({
        status: 'error',
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
      // Validate all files are CSV
      const invalidFile = fileList.find(
        (f) => f.type !== 'text/csv' && !f.name.endsWith('.csv')
      );
      if (invalidFile) {
        message.error('You can only upload CSV files!');
        return Upload.LIST_IGNORE;
      }

      // Only process the upload if this is the last file in the list
      // This ensures we only call handleUpload once
      if (file === fileList[fileList.length - 1]) {
        handleUpload(fileList);
      }

      return false; // prevent auto upload by Ant Design
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

      {uploadProgress.status !== 'idle' && (
        <div className="px-4">
          <Progress
            percent={uploadProgress.progress}
            status={uploadProgress.status === 'error' ? 'exception' : undefined}
            className="mb-2"
          />
          <p className="text-sm text-gray-600">
            {uploadProgress.status === 'uploading' && 'Uploading...'}
            {uploadProgress.status === 'success' && 'Upload complete!'}
            {uploadProgress.status === 'error' && uploadProgress.message}
          </p>
        </div>
      )}
    </div>
  );
};

export { CSVUpload };
