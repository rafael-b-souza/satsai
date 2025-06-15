from pydantic import BaseSettings

class Settings(BaseSettings):
    api_prefix: str = "/api/v1"
    project_name: str = "SatsAi API"

    class Config:
        env_file = ".env"

def get_settings() -> Settings:
    return Settings()  # singleton via caching if needed