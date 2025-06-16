from fastapi.testclient import TestClient
from app.main import app
from app.services.openai_client import OpenAIClient
from app.services import usage as usage_module

client = TestClient(app)


def test_chat_stream(monkeypatch):
    monkeypatch.setattr(usage_module.UsageService, "has_balance", lambda self, sid, tok: True)
    monkeypatch.setattr(usage_module.UsageService, "deduct", lambda self, sid, tok: None)

    def dummy_stream(messages):
        for part in ["hello", " world"]:
            yield part

    monkeypatch.setattr(OpenAIClient, "stream_chat", dummy_stream)

    r = client.post(
        "/api/v1/chat/?session_id=1",
        json=[{"role": "user", "content": "hi"}],
        stream=True,
    )
    assert r.status_code == 200
    body = b"".join(r.iter_bytes())
    assert b"hello" in body
    assert b"world" in body


def test_chat_no_balance(monkeypatch):
    monkeypatch.setattr(usage_module.UsageService, "has_balance", lambda self, sid, tok: False)

    r = client.post(
        "/api/v1/chat/?session_id=1",
        json=[],
        stream=True,
    )
    assert r.status_code == 402
