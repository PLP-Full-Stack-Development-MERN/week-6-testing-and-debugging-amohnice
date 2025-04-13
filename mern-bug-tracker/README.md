# Bug Tracker Application

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for tracking and managing bugs in software projects.

## Features

- Create, read, update, and delete bug reports
- Set bug priority (low, medium, high)
- Track bug status (open, in-progress, resolved)
- Modern and responsive UI
- Comprehensive test coverage

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mern-bug-tracker
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bug-tracker
   NODE_ENV=development
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Testing

### Backend Tests

The backend uses Jest and Supertest for testing. To run the tests:

```bash
cd backend
npm test
```

The tests cover:
- API endpoints for CRUD operations
- Input validation
- Error handling
- Database operations using an in-memory MongoDB server

### Frontend Tests

The frontend uses React Testing Library for component testing. To run the tests:

```bash
cd frontend
npm test
```

## Debugging

### Backend Debugging

1. Using console.logs:
   - Check the terminal running the backend server for logs
   - Logs include database connection status, API requests, and errors

2. Using Node.js inspector:
   - Run the backend with inspector:
     ```bash
     node --inspect backend/server.js
     ```
   - Open Chrome DevTools and connect to the Node inspector

### Frontend Debugging

1. React Developer Tools:
   - Install the React Developer Tools browser extension
   - Use it to inspect component state and props

2. Network Requests:
   - Use the Network tab in browser DevTools to monitor API calls
   - Check request/response data and status codes

3. Console Logs:
   - Check the browser console for errors and debug logs
   - Component lifecycle and state updates are logged

## Error Handling

- Backend uses Express error middleware for consistent error responses
- Frontend implements error boundaries to catch and display React component errors
- API errors are caught and displayed to users with friendly messages
- Form validation prevents invalid data submission

## Project Structure

```
mern-bug-tracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── App.js
    │   └── App.css
    └── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 