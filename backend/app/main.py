from fastapi import FastAPI
from .config import get_settings
from .api import health, payments, chat, sessions

settings = get_settings()
app = FastAPI(title=settings.project_name)
app.include_router(health.router, prefix=settings.api_prefix)
app.include_router(payments.router, prefix=settings.api_prefix)
app.include_router(chat.router, prefix=settings.api_prefix)
app.include_router(sessions.router, prefix=settings.api_prefix)


@app.get("/", include_in_schema=False)
async def root():
    return {"message": "SatsAi backend online"}
