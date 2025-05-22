import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Table, type TableProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { csvService } from '../services/csvService';
import type { CSVData } from '../types/csv';

interface TableBuilderProps {
  initialData: CSVData[];
  initialLoading?: boolean;
  onDataChange?: (data: CSVData[]) => void;
}

export const TableBuilder: React.FC<TableBuilderProps> = ({
  initialData = [],
  initialLoading = false,
  onDataChange,
}) => {
  const [data, setData] = useState<CSVData[]>(initialData || []);
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
      setData(response.data || []);
      onDataChange?.(response.data || []);
      setPagination(prev => ({
        ...prev,
        total: response.total,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
      onDataChange?.([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, searchText);
  }, [pagination.current, pagination.pageSize, searchText]);

  const handleTableChange: TableProps<CSVData>['onChange'] = (newPagination) => {
    if (newPagination.current && newPagination.pageSize) {
      setPagination({
        current: newPagination.current,
        pageSize: newPagination.pageSize,
        total: pagination.total,
      });
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];

    return Object.keys(data[0]).map((key) => ({
      title: key,
      dataIndex: key,
      key: key,
      sorter: (a: CSVData, b: CSVData) => {
        const aValue = a[key];
        const bValue = b[key];
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue;
        }
        return String(aValue).localeCompare(String(bValue));
      },
      filterable: true,
      render: (value: string | number) => {
        if (typeof value === 'number') {
          return value.toLocaleString();
        }
        return value;
      },
    }));
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">CSV Data</h2>
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
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">CSV Data</h2>
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
          showQuickJumper: true,
        }}
        onChange={handleTableChange}
        className="shadow-sm rounded-lg"
      />
    </div>
  );
}; 