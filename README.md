# satsai

AI chat application featuring a Lightning Network paywall, built with FastAPI and React.

## Overview

SatsAi allows users to pay for AI chat interactions using Bitcoin over the Lightning Network. Users receive a Lightning invoice via the `/pay` route, which generates a QR code and monitors payment status. Once the invoice is settled, the session balance is credited and access to `/chat` is enabled.

Key components:
- **Backend**: FastAPI, SQLAlchemy, Alembic, SQLite/PostgreSQL, LNbits client, OpenAI-compatible chat completion.
- **Frontend**: React, TypeScript, Tailwind CSS, Vite, Lucide icons, Dark mode support.

## Environment setup

Create a `.env` file in the project root. A sample is provided as `.env.example`:

```bash
cp .env.example .env
# edit the file and supply your credentials
```

Required variables are:

- `LNBITS_URL` – URL of your LNbits instance
- `LNBITS_KEY` – admin key used to create invoices
- `DATABASE_URL` – connection string for the database
- `OPENAI_API_KEY` – key used to access OpenAI APIs

## Database migrations

From the `backend` directory run the Alembic migrations:

```bash
cd backend
alembic upgrade head
```

## Running the backend

Start the FastAPI application with Uvicorn:

```bash
uvicorn app.main:app --reload
```

## Running the frontend

Install dependencies and launch the dev server:

```bash
cd frontend
npm install
npm run dev
```

The React app will be available on `http://localhost:5173` by default and will proxy API calls to the backend.

## Building the frontend

To generate the production static files run:

```bash
npm run build
```

The compiled assets will be written to `frontend/dist`. Serve these files with any static web server (for example `npx serve -s dist`) or deploy them to your preferred hosting platform.
