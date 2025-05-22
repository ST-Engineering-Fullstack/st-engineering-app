import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Progress, Upload } from 'antd';
import { useState } from 'react';
import { csvService } from '../services/csvService';
import type { CSVUploadProps, UploadProgress } from '../types/csv';

const { Dragger } = Upload;

const CSVUpload: React.FC<CSVUploadProps> = ({ onDataLoaded }) => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    status: 'idle',
    progress: 0,
  });

  const handleUpload = async (file: File) => {
    try {
      // Validate CSV file
      setUploadProgress({ status: 'uploading', progress: 0 });
      const validation = await csvService.validateCSV(file);
      
      if (!validation.isValid) {
        setUploadProgress({
          status: 'error',
          progress: 0,
          message: validation.errors.join(', '),
        });
        message.error('Invalid CSV file: ' + validation.errors.join(', '));
        return;
      }

      // Upload CSV file
      await csvService.uploadCSV(file, (progress) => {
        setUploadProgress({ status: 'uploading', progress });
      });

      // Get initial data
      const { data } = await csvService.getCSVData({ page: 1, pageSize: 10 });
      onDataLoaded(data);
      
      setUploadProgress({ status: 'success', progress: 100 });
      message.success('CSV file uploaded successfully');
    } catch (error) {
      setUploadProgress({
        status: 'error',
        progress: 0,
        message: error instanceof Error ? error.message : 'Upload failed',
      });
      message.error('Failed to upload CSV file');
    }
  };

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.csv',
    showUploadList: false,
    beforeUpload: (file) => {
      const isCSV = file.type === 'text/csv' || file.name.endsWith('.csv');
      if (!isCSV) {
        message.error('You can only upload CSV files!');
        return Upload.LIST_IGNORE;
      }
      handleUpload(file);
      return false;
    },
  };

  return (
    <div className="space-y-4">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag CSV file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single CSV file upload. Strictly prohibited from uploading company data or other
          banned files.
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
