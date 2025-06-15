from fastapi import FastAPI
from .config import get_settings
from .api.v1 import health

settings = get_settings()
app = FastAPI(title=settings.project_name)
app.include_router(health.router, prefix=settings.api_prefix)

# root redirect → docs
@app.get("/", include_in_schema=False)
async def root():
    return {"message": "SatsAi backend online"}