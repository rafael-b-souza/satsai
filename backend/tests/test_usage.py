from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.models import Base, Session as DBSession, Payment, Usage
from app.services.usage import UsageService


def setup_db():
    engine = create_engine("sqlite:///:memory:", future=True)
    Base.metadata.create_all(engine)
    return sessionmaker(bind=engine, autoflush=False)()


def test_usage_balance_and_deduct():
    db = setup_db()
    sess = DBSession()
    db.add(sess)
    db.commit()
    db.refresh(sess)

    # credit 100 tokens paid
    payment = Payment(session_id=sess.id, payment_hash="h", amount=100, paid=True)
    db.add(payment)
    db.commit()

    service = UsageService(db)
    assert service.has_balance(sess.id, 50)

    usage = service.deduct(sess.id, 30)
    assert isinstance(usage, Usage)
    assert service.has_balance(sess.id, 70)

    service.deduct(sess.id, 70)
    assert not service.has_balance(sess.id, 1)

