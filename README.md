# satsai

This project contains a FastAPI backend and a React frontend.

The frontend now uses Tailwind CSS with dark mode support and React Router for three routes: `/`, `/pay`, and `/chat`. A global session store tracks the current session and balance.

The `/pay` page displays a Lightning invoice using the new `LightningPaywall` component. The component renders a QR code, allows copying the invoice string and polls `/api/v1/payments/invoice/{hash}` until the invoice is paid. Once paid the balance is stored and the user is navigated to the chat page.
