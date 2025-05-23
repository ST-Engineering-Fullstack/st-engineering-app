import { SearchOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Input, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { csvService } from '../services/csvService';
import type { CSVData } from '../types/csv';

interface DataTableProps {
  data: CSVData[];
  loading?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ data: initialData, loading: initialLoading }) => {
  const [data, setData] = useState<CSVData[]>(initialData);
  const [loading, setLoading] = useState(initialLoading);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (page: number, pageSize: number, search?: string) => {
    try {
      setLoading(true);
      const response = await csvService.getCSVData({
        page,
        pageSize,
        search,
      });
      setData(response.data);
      setPagination(prev => ({
        ...prev,
        total: response?.total,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, searchText);
  }, [pagination, pagination.pageSize, searchText]);

  const handleTableChange: TableProps<CSVData>['onChange'] = (newPagination) => {
    if (newPagination.current && newPagination.pageSize) {
      setPagination({
        current: newPagination.current,
        pageSize: newPagination.pageSize,
        total: pagination?.total,
      });
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  if (!data.length) return null;

  const columns: TableProps<CSVData>['columns'] = Object.keys(data[0]).map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
    sorter: (a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }
      return String(aValue).localeCompare(String(bValue));
    },
  }));

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-end">
        <Space>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            allowClear
            className="w-64"
          />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(_record, index) => index?.toString() || ''}
        scroll={{ x: 'max-content' }}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}; 