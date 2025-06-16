from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    api_prefix: str = "/api/v1"
    project_name: str = "SatsAi API"
    lnbits_url: str = Field(
        "http://localhost:5000", env=["LNBITS_URL", "LNBITS_API_URL"]
    )
    lnbits_key: str = Field("", env=["LNBITS_KEY", "LNBITS_API_KEY"])
    database_url: str = "sqlite:///./satsai.db"
    openai_api_key: str = ""
    openai_model: str = "gpt-3.5-turbo"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


def get_settings() -> Settings:
    return Settings()

