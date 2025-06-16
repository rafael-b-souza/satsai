from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models

router = APIRouter(prefix="/sessions", tags=["sessions"])


@router.post("/")
async def create_session(db: Session = Depends(get_db)):
    session = models.Session()
    db.add(session)
    db.commit()
    db.refresh(session)
    return {"id": session.id}
