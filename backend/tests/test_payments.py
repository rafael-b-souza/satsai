from fastapi.testclient import TestClient
from app.main import app
from app.services.invoice import InvoiceService

client = TestClient(app)


class DummyService:
    def __init__(self):
        self.created = None

    def create(self, amount: int, memo: str = "", webhook: str | None = None):
        self.created = {"amount": amount, "memo": memo, "webhook": webhook}
        return {"payment_hash": "hash", "payment_request": "lnbc1dummy"}

    def check(self, payment_hash: str):
        assert payment_hash == "hash"
        return {"paid": True}


def test_create_invoice(monkeypatch):
    dummy = DummyService()
    monkeypatch.setattr(InvoiceService, "create", dummy.create)
    r = client.post("/api/v1/payments/invoice?amount=10&memo=test")
    assert r.status_code == 200
    assert r.json()["payment_request"] == "lnbc1dummy"


def test_check_invoice(monkeypatch):
    dummy = DummyService()
    monkeypatch.setattr(InvoiceService, "check", dummy.check)
    r = client.get("/api/v1/payments/invoice/hash")
    assert r.status_code == 200
    assert r.json()["paid"] is True


def test_webhook():
    payload = {"payment_hash": "hash"}
    r = client.post("/api/v1/payments/notify", json=payload)
    assert r.status_code == 200
    assert r.json()["status"] == "received"
    assert r.json()["payload"] == payload
