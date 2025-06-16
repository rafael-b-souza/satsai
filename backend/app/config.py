from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    api_prefix: str = "/api/v1"
    project_name: str = "SatsAi API"
    lnbits_url: str = "http://localhost:5000"
    lnbits_key: str = ""
    database_url: str = "sqlite:///./satsai.db"
    openai_api_key: str = ""
    openai_model: str = "gpt-3.5-turbo"

    model_config = SettingsConfigDict(env_file=".env")


def get_settings() -> Settings:
    return Settings()

