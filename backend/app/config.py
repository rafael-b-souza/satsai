from pydantic import BaseSettings

class Settings(BaseSettings):
    api_prefix: str = "/api/v1"
    project_name: str = "SatsAi API"
    lnbits_url: str = "http://localhost:5000"
    lnbits_key: str = ""

    class Config:
        env_file = ".env"


def get_settings() -> Settings:
    return Settings()
