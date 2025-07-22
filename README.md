# Max ERP Recruitment Module

A functional recruitment module for Max ERP that allows HR managers to create and manage job postings.

## Features

- Create job posts with comprehensive details
- View all job posts in a clean, organized list
- Form validation and error handling
- Responsive design for mobile and desktop
- Real-time success/failure notifications

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
npm run install:all
```

### Running the Application

To start both frontend and backend simultaneously:

```bash
npm start
```

Or run them separately:

**Backend** (runs on http://localhost:5000):
```bash
cd backend
npm start
```

**Frontend** (runs on http://localhost:3000):
```bash
cd frontend
npm start
```

## Project Structure

```
max-erp-recruitment/
├── backend/
│   ├── server.js         # Express server with API endpoints
│   └── package.json
├── frontend/
│   └── src/
│       ├── api/          # API client modules
│       ├── components/   # React components
│       ├── hooks/        # Custom React hooks
│       ├── store/        # Redux store and slices
│       ├── types/        # TypeScript type definitions
│       └── App.tsx       # Main application component
├── TECHNICAL_DOCUMENTATION.md
├── README.md
└── package.json
```

## Usage

1. Open the application in your browser at http://localhost:3000
2. Fill out the job post form on the left side:
   - Enter job title, department, and location
   - Select employment type
   - Write a detailed job description (minimum 50 characters)
   - Choose an application deadline (must be a future date)
3. Click "Create Job Post" to submit
4. View your created job posts in the list on the right side

## Technical Documentation

For detailed technical information, component breakdown, and architecture details, see [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md)

## Built With

- **Frontend**: React, TypeScript, Redux Toolkit, Ant Design
- **Backend**: Node.js, Express
- **State Management**: Redux Toolkit
- **UI Components**: Ant Design 5