# Max ERP Recruitment Module - Technical Documentation

## Overview

The Max ERP Recruitment Module is a full-stack application built with React, Node.js, and Ant Design that allows HR managers to create and manage job postings. The application features a clean, responsive interface with real-time form validation and in-memory data storage.

### Tech Stack
- **Frontend**: React 18, TypeScript, Redux Toolkit, Ant Design 5
- **Backend**: Node.js, Express 5
- **State Management**: Redux Toolkit
- **UI Framework**: Ant Design
- **Rich Text Editor**: TipTap with StarterKit extensions
- **HTTP Client**: Axios
- **Date Handling**: Day.js

## Component Breakdown and Responsibilities

### Frontend Components

#### 1. **App.tsx**
- Root component that sets up the application layout
- Provides Redux store to the entire application
- Manages the overall page structure with header and content areas

#### 2. **JobPostForm.tsx** (`src/components/JobPostForm.tsx`)
- Handles job post creation with comprehensive form validation
- Features:
  - Form fields: Job Title, Department, Employment Type, Description, Location, Deadline
  - Rich text editor with TipTap for job descriptions
  - Real-time validation with custom rules
  - Loading states during submission
  - Success/error notifications
  - Automatic form reset after successful submission
- Integrates with Redux for state management

#### 3. **JobPostEditForm.tsx** (`src/components/JobPostEditForm.tsx`)
- Handles editing existing job posts with pre-populated form fields
- Features:
  - Advanced rich text editor with toolbar controls
  - Formatting options: Bold, Italic, Lists, Links, Code blocks
  - Form validation matching creation form
  - Real-time preview of formatted content
  - Direct API integration for updates
  - Success/error handling with user feedback
- Uses TipTap editor with extensions: StarterKit, Link, Placeholder

#### 4. **JobPostsList.tsx** (`src/components/JobPostsList.tsx`)
- Displays all created job posts in a list format
- Features:
  - Loading states while fetching data
  - Error handling with user-friendly messages
  - Empty state when no posts exist
  - Responsive card-based layout
  - Color-coded employment type tags
  - Formatted dates and metadata
  - Edit functionality with modal dialogs
  - Delete capabilities with confirmation

#### 5. **Sidebar.tsx** (`src/components/Sidebar.tsx`)
- Navigation component for switching between different views
- Features:
  - Clean menu interface with Ant Design
  - Active state highlighting
  - Route-based navigation integration

### Page Components

#### **CurrentJobOpenings.tsx** (`src/pages/CurrentJobOpenings.tsx`)
- Main dashboard view displaying all active job postings
- Integrates JobPostsList component for data display

#### **ManageJobs.tsx** (`src/pages/ManageJobs.tsx`)
- Administrative interface for job management
- Combines JobPostForm and JobPostsList for full CRUD operations

### Backend Components

#### **Simple Monolithic Architecture**
The backend uses a straightforward single-file architecture for rapid development:

```
backend/
├── node_modules/          # Dependencies
├── package.json          # Project configuration
├── package-lock.json     # Dependency lock file
└── server.js             # Complete backend implementation
```

#### **server.js - Complete Backend Implementation**

The entire backend is contained in a single file with the following components:

1. **Express Server Setup**:
   - CORS middleware for cross-origin requests
   - JSON body parsing
   - Port configuration (default: 5000)

2. **In-Memory Data Storage**:
   - `jobPosts` array for storing job post data
   - `nextId` counter for auto-incrementing IDs

3. **Request Logging Middleware**:
   - Timestamps all API requests
   - Logs request method, path, and body

4. **CRUD API Endpoints**:
   - Full REST API implementation
   - Input validation for all endpoints
   - Detailed console logging for debugging

5. **Server Initialization**:
   - Startup logging with endpoint documentation
   - Clear API endpoint listing on startup

#### **API Endpoints**
- Base URL: `http://localhost:5000/api`
- Endpoints:
  - `GET /job-posts`: Retrieve all job posts
  - `POST /job-posts`: Create a new job post
  - `GET /job-posts/:id`: Retrieve a specific job post
  - `PUT /job-posts/:id`: Update a job post
  - `DELETE /job-posts/:id`: Delete a job post

#### **API Features**:
- **Validation**: Server-side validation for all required fields
- **Error Handling**: Consistent error responses with appropriate HTTP status codes
- **Logging**: Comprehensive request/response logging for debugging
- **CORS Support**: Configured for frontend-backend communication

### State Management

#### **Redux Store** (`src/store/index.ts`)
- Centralized state management using Redux Toolkit
- Single slice for job posts management

#### **Job Posts Slice** (`src/store/reducers/jobPostsSlice/index.ts`)
- Manages job posts state with async thunks
- State shape:
  ```typescript
  {
    posts: JobPost[],
    loading: boolean,
    error: string | null,
    createStatus: 'idle' | 'loading' | 'success' | 'error',
    createError: string | null
  }
  ```
- Actions: fetch posts, create post, reset status

### Custom Hooks

#### **useJobPosts** (`src/hooks/useJobPosts.ts`)
- Provides easy access to job posts state and actions
- Encapsulates Redux dispatch and selector logic
- Returns posts data and action methods

## Data Handling and Validation

### Form Validation Rules
1. **Job Title**: Required, minimum 3 characters
2. **Department**: Required
3. **Employment Type**: Required, must be one of: Full-time, Part-time, Internship
4. **Job Description**: Required, minimum 50 characters, supports rich text formatting
5. **Location**: Required
6. **Application Deadline**: Required, must be a future date (past dates disabled)

### Rich Text Editor Features
- **TipTap Integration**: Modern WYSIWYG editor with extensible architecture
- **Formatting Options**: Bold, italic, bullet lists, numbered lists
- **Advanced Features**: Link insertion, code blocks, placeholder text
- **Validation**: Real-time character count and content validation
- **HTML Output**: Clean HTML generation for storage and display

### Data Flow
1. User fills out the job post form
2. Form validation occurs on the client side
3. Valid data is sent to the backend API
4. Backend validates required fields
5. Job post is stored in memory with auto-generated ID and timestamp
6. Success response triggers UI update
7. Redux store is updated with the new post
8. List view automatically reflects the new addition

### API Response Format
```json
{
  "success": boolean,
  "message": string,
  "data": JobPost | JobPost[]
}
```

## Functional Coverage Checklist

✅ **Core Features Implemented**
- Job post creation form with rich text editor
- Job post editing with pre-populated forms
- Client-side form validation with real-time feedback
- Server-side validation and error handling
- Success/failure notifications with Ant Design messages
- Job posts list view with formatted content display
- CRUD operations: Create, Read, Update, Delete
- Responsive design for mobile and desktop
- Loading states for async operations
- Error handling and user feedback
- Empty states and placeholder content
- Navigation with sidebar component
- Multiple page views for different workflows

✅ **UI/UX Considerations**
- Clean, professional interface using Ant Design
- Consistent color scheme and spacing
- Responsive grid layout
- Accessible form labels and error messages
- Visual feedback for user actions

✅ **Technical Requirements**
- Reusable components
- TypeScript for type safety
- Centralized state management
- Separation of concerns
- RESTful API design

## Known Limitations and Improvement Areas

### Current Limitations
1. **Data Persistence**: Uses in-memory storage - data is lost on server restart
2. **Authentication**: No user authentication or authorization
3. **Search/Filter**: No ability to search or filter job posts
4. **Pagination**: All posts are loaded at once
5. **File Uploads**: No support for attachments or images in job posts
6. **Email Integration**: No automated notifications for applications

### Future Improvements
1. **Database Integration**: Implement PostgreSQL or MongoDB for persistent storage
2. **Enhanced Editor Features**:
   - Image upload and embedding
   - Table support
   - Advanced text formatting options
   - Auto-save functionality
3. **Advanced Features**:
   - Search and filter functionality
   - Pagination for large datasets
   - Job post status management (draft, published, archived)
   - Application tracking
   - Email notifications
4. **Security Enhancements**:
   - Input sanitization
   - Rate limiting
   - Authentication and authorization
   - HTTPS implementation
5. **Testing**:
   - Unit tests for components
   - Integration tests for API
   - End-to-end testing

## Running the Application

### Backend
```bash
cd backend
npm install
npm start
```
Server runs on http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm start
```
Application runs on http://localhost:3000

## Architecture Notes

The application follows a clean architecture pattern with clear separation between:
- **Presentation Layer**: React components with Ant Design
- **State Management Layer**: Redux Toolkit
- **API Layer**: Axios-based API client
- **Backend Service Layer**: Express routes and handlers

This modular approach makes it easy to extend functionality, swap implementations, and maintain the codebase as it grows.