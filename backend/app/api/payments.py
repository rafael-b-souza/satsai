from fastapi import APIRouter, HTTPException, Request, Depends
from sqlalchemy.orm import Session

from ..services.invoice import InvoiceService
from ..database import get_db
from .. import models

router = APIRouter(prefix="/payments", tags=["payments"])
service = InvoiceService()


@router.post("/invoice")
async def create_invoice(
    amount: int,
    memo: str = "",
    request: Request = None,
    db: Session = Depends(get_db),
):
    webhook = str(request.url_for("payment_notify"))
    try:
        invoice = service.create(amount, memo, webhook)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

    session = models.Session()
    db.add(session)
    db.commit()
    db.refresh(session)

    payment = models.Payment(
        session_id=session.id,
        payment_hash=invoice["payment_hash"],
        payment_request=invoice.get("payment_request"),
        amount=amount,
    )
    db.add(payment)
    db.commit()
    return invoice


@router.get("/invoice/{payment_hash}")
async def check_invoice(payment_hash: str):
    try:
        status = service.check(payment_hash)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    return status


@router.post("/notify", name="payment_notify")
async def payment_notify(payload: dict, db: Session = Depends(get_db)):
    payment_hash = payload.get("payment_hash")
    if not payment_hash:
        raise HTTPException(status_code=400, detail="missing payment_hash")

    payment = (
        db.query(models.Payment)
        .filter(models.Payment.payment_hash == payment_hash)
        .first()
    )
    if not payment:
        raise HTTPException(status_code=404, detail="payment not found")

    try:
        status = service.check(payment_hash)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

    if not status.get("paid"):
        raise HTTPException(status_code=400, detail="payment not settled")

    payment.paid = True
    db.commit()
    return {"ok": True}
