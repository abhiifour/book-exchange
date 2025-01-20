# Book Exchange Platform

A web application that enables users to discover, list, and exchange books with other readers. The platform facilitates book sharing through an intelligent matching system that connects users based on their reading preferences and available books.
visit : https://book-exchange-chi.vercel.app/
## Features

### User Authentication
- Secure registration and login system
- User profile management
- Session management and secure logout

### Book Management
- List books available for exchange
- Edit or remove book listings
- Add detailed book information:
  - Title
  - Author
  - Genre
  - Price
  - Cover image 

### Book Discovery
- Browse available books
- Explore detailed book cards

### Matchmaking System
- Smart matching algorithm based on:
  - User preferences
  - Reading history
  - Book availability
- Match suggestions 
- Exchange request system

## Technology Stack

### Frontend
- React.js
- CSS Library (Tailwind CSS)
- Redux for state management
- Redux thunk / Axios for API requests

### Backend
- Node.js with Express
- Prisma and MongoDB for database
- JWT for authentication
- MVC architecture

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Getting Started

### Prerequisites
```bash
node >= 14.0.0
npm >= 6.0.0
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/Abhiifour/book-exchange.git
cd book-exchange
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Environment setup
```bash
# Create .env file in backend directory
cp .env.example .env

# Update .env with your configuration
DATABASE_URL="your_url"
```

4. Start development servers
```bash
# Start backend server
cd backend
node dist/index.js

# Start frontend server
cd frontend
npm run dev
```

## Error Handling

The application implements comprehensive error handling for:
- Invalid user inputs
- Duplicate book listings
- Failed API requests
- Authentication errors
- Database connection issues


## Security Measures

- JWT authentication
- Input sanitization
- CORS configuration
