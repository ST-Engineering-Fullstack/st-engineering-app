# ST Engineering Frontend Application

A modern web application built with React, TypeScript, and Vite for managing and processing CSV files.

## Features

- CSV file upload (single and multiple files)
- Real-time upload progress tracking
- File management dashboard
- Responsive design with Tailwind CSS
- Modern UI components using Ant Design
- Data fetching and caching with React Query

## Tech Stack

- React 19
- TypeScript
- Vite
- React Query
- Ant Design
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd st-engineering-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
VITE_API_URL=http://0.0.0.0:3000
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://0.0.0.0:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── apis/          # API integration
├── components/    # Reusable components
├── constants/     # Application constants
├── pages/         # Page components
├── types/         # TypeScript types
├── utils/         # Utility functions
└── App.tsx        # Root component
```

## Development Guidelines

1. Follow TypeScript best practices
2. Use functional components with hooks
3. Implement proper error handling
4. Write clean and maintainable code
5. Follow the existing code style

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

ISC
