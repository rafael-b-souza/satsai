from logging.config import fileConfig
from sqlalchemy import engine_from_config
from sqlalchemy import pool
from sqlalchemy import create_engine

from alembic import context

import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1] / "app"))

from app.config import get_settings
from app.database import Base
from app import models  # noqa: F401

config = context.config
fileConfig(config.config_file_name)

def get_engine():
    settings = get_settings()
    return create_engine(settings.database_url, future=True)

def run_migrations_offline():
    url = get_settings().database_url
    context.configure(
        url=url,
        target_metadata=Base.metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    engine = get_engine()
    with engine.connect() as connection:
        context.configure(connection=connection, target_metadata=Base.metadata)

        with context.begin_transaction():
            context.run_migrations()


def run_migrations():
    if context.is_offline_mode():
        run_migrations_offline()
    else:
        run_migrations_online()

run_migrations()
