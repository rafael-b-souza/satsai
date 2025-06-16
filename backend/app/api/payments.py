from fastapi import APIRouter, HTTPException, Request
from ..services.invoice import InvoiceService

router = APIRouter(prefix="/payments", tags=["payments"])
service = InvoiceService()


@router.post("/invoice")
async def create_invoice(amount: int, memo: str = "", request: Request):
    webhook = str(request.url_for("payment_notify"))
    try:
        invoice = service.create(amount, memo, webhook)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    return invoice


@router.get("/invoice/{payment_hash}")
async def check_invoice(payment_hash: str):
    try:
        status = service.check(payment_hash)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    return status


@router.post("/notify", name="payment_notify")
async def payment_notify(payload: dict):
    # In a real application we'd verify and store the notification
    return {"status": "received", "payload": payload}
