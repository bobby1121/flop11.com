# FLOP11 - Fantasy Cricket Game

A fantasy cricket gaming app where the team with the lowest points wins! Built with React, Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- Admin dashboard for managing players and matches
- Create fantasy teams of 11 players
- Select captain and vice-captain
- Leaderboard with lowest points ranking
- Red and black themed UI

## Tech Stack

- Frontend: React, Material-UI
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Setup Instructions

### Backend

1. Install dependencies:
```bash
npm install
```

2. Create a .env file in the root directory:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

3. Start the server:
```bash
npm run dev
```

### Frontend

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Deployment

The application is deployed on:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas 