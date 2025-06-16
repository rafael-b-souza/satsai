import openai

from ..config import get_settings


class OpenAIClient:
    """Wrapper around openai ChatCompletion with streaming support."""

    def __init__(self):
        settings = get_settings()
        openai.api_key = settings.openai_api_key
        self.model = settings.openai_model

    def stream_chat(self, messages: list[dict]):
        """Yield content fragments from OpenAI chat completion."""
        response = openai.ChatCompletion.create(
            model=self.model,
            messages=messages,
            stream=True,
        )
        for chunk in response:
            content = (
                chunk.get("choices", [{}])[0].get("delta", {}).get("content")
            )
            if content:
                yield content
