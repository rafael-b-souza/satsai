import json
import urllib.request

from ..config import get_settings


class InvoiceService:
    """Simple LNbits invoice helper."""

    def __init__(self):
        settings = get_settings()
        self.base_url = settings.lnbits_url.rstrip("/")
        self.api_key = settings.lnbits_key

    def _request(self, path: str, data: dict | None = None) -> dict:
        url = f"{self.base_url}{path}"
        headers = {"X-Api-Key": self.api_key}
        if data is not None:
            body = json.dumps(data).encode()
            headers["Content-Type"] = "application/json"
            req = urllib.request.Request(url, data=body, headers=headers, method="POST")
        else:
            req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            return json.load(resp)

    def create(self, amount: int, memo: str, webhook: str | None = None) -> dict:
        payload = {"out": False, "amount": amount, "memo": memo}
        if webhook:
            payload["webhook"] = webhook
        return self._request("/api/v1/payments", payload)

    def check(self, payment_hash: str) -> dict:
        return self._request(f"/api/v1/payments/{payment_hash}")
