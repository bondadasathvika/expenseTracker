# Expense Tracker

A complete full-stack Expense Tracker built with React, Node, and Express. This app uses an in-memory REST API backend and a modern responsive frontend UI.

## Project Structure

```
expense-tracker/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Features

- Responsive dashboard UI
- Add, edit, delete, and view transactions
- Income, expense, and balance summary cards
- Category-wise expense breakdown
- REST API backend with Express and in-memory storage
- Modular frontend components and reusable hooks

## Backend Setup

1. Open a terminal and go to the backend folder:

```bash
cd "Expense tracker"/backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm run dev
```

The backend server will run on `http://localhost:5000`.

## Frontend Setup

1. Open another terminal and go to the frontend folder:

```bash
cd "Expense tracker"/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend app:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` by default.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/transactions/:id` | Get a single transaction by ID |
| POST | `/api/transactions` | Add a new transaction |
| PUT | `/api/transactions/:id` | Update an existing transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |

### Example Request Body for POST / PUT

```json
{
  "title": "Freelance Sale",
  "amount": 2500,
  "type": "income",
  "category": "Business",
  "date": "2026-05-25T15:30:00.000Z"
}
```

## Notes

- The backend uses in-memory data storage, so transactions reset when the server restarts.
- Update the backend port if `5000` is already in use.
- This project is beginner-friendly, modular, and ready for GitHub.
