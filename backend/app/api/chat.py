from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from ..database import get_db
from ..services.usage import UsageService
from ..services.openai_client import OpenAIClient

router = APIRouter(prefix="/chat", tags=["chat"])
client = OpenAIClient()


@router.post("/")
async def chat(messages: list[dict], session_id: int, db: Session = Depends(get_db)):
    service = UsageService(db)
    if not service.has_balance(session_id, 1):
        raise HTTPException(status_code=402, detail="insufficient balance")

    def event_generator():
        total = 0
        for chunk in client.stream_chat(messages):
            total += 1
            yield f"data: {chunk}\n\n"
        service.deduct(session_id, total)

    return StreamingResponse(event_generator(), media_type="text/event-stream")
