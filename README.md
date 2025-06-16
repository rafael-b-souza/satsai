# satsai

This project contains a FastAPI backend and a React frontend.

The frontend now uses Tailwind CSS with dark mode support and React Router for three routes: `/`, `/pay`, and `/chat`. A global session store tracks the current session and balance.

The `/pay` page displays a Lightning invoice using the new `LightningPaywall` component. The component renders a QR code, allows copying the invoice string and polls `/api/v1/payments/invoice/{hash}` until the invoice is paid. Once paid the balance is stored and the user is navigated to the chat page.

Sessions are now created explicitly via `POST /api/v1/sessions`. The returned ID must be sent with payment and chat requests to track balance usage.

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
