import { Link } from 'react-router-dom';
import { MY_ROUTE } from '../router/route.constant';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to={MY_ROUTE.HOME}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#f2100e] hover:bg-[#d40e0c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f2100e]"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 