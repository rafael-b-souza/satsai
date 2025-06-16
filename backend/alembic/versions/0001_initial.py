"""initial tables"""

from alembic import op
import sqlalchemy as sa

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "sessions",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("created_at", sa.DateTime, nullable=True),
    )
    op.create_table(
        "payments",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("session_id", sa.Integer, sa.ForeignKey("sessions.id"), nullable=False),
        sa.Column("payment_hash", sa.String, nullable=False, unique=True),
        sa.Column("amount", sa.Integer, nullable=False),
        sa.Column("paid", sa.Boolean, nullable=True, server_default=sa.text("0")),
        sa.Column("created_at", sa.DateTime, nullable=True),
    )
    op.create_table(
        "usage",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("session_id", sa.Integer, sa.ForeignKey("sessions.id"), nullable=False),
        sa.Column("tokens", sa.Integer, nullable=False),
        sa.Column("created_at", sa.DateTime, nullable=True),
    )


def downgrade() -> None:
    op.drop_table("usage")
    op.drop_table("payments")
    op.drop_table("sessions")

