import { useState } from 'react';
import { CSVUpload } from '../components/CSVUpload';
import { TableBuilder } from '../components/TableBuilder';
import type { CSVData } from '../types/csv';

const HomePage = () => {
  const [csvData, setCSVData] = useState<CSVData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDataLoaded = (data: CSVData[]) => {
    setLoading(true);
    setTimeout(() => {
      setCSVData(data);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">CSV Data Viewer</h1>
      <div className="max-w-6xl mx-auto space-y-8">
        <CSVUpload onDataLoaded={handleDataLoaded} />
        <TableBuilder
          initialData={csvData}
          initialLoading={loading}
          onDataChange={setCSVData}
        />
      </div>
    </div>
  );
};

export default HomePage;