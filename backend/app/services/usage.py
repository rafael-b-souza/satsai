from sqlalchemy import func
from sqlalchemy.orm import Session

from .. import models


class UsageService:
    """Track token usage and check balances."""

    def __init__(self, db: Session):
        self.db = db

    def balance(self, session_id: int) -> int:
        paid = (
            self.db.query(func.coalesce(func.sum(models.Payment.amount), 0))
            .filter(models.Payment.session_id == session_id, models.Payment.paid.is_(True))
            .scalar()
        )
        used = (
            self.db.query(func.coalesce(func.sum(models.Usage.tokens), 0))
            .filter(models.Usage.session_id == session_id)
            .scalar()
        )
        return paid - used

    def has_balance(self, session_id: int, tokens: int) -> bool:
        return self.balance(session_id) >= tokens

    def deduct(self, session_id: int, tokens: int) -> models.Usage:
        if not self.has_balance(session_id, tokens):
            raise ValueError("insufficient balance")
        usage = models.Usage(session_id=session_id, tokens=tokens)
        self.db.add(usage)
        self.db.commit()
        self.db.refresh(usage)
        return usage

