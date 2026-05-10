import os
from pathlib import Path
from urllib.parse import urlparse, parse_qs, urlunparse
import ssl
from sqlalchemy import Table, Column, Integer, Float, String, DateTime, MetaData, func
from sqlalchemy.ext.asyncio import create_async_engine
from dotenv import load_dotenv

env_path = Path(__file__).parent / '.env'
if env_path.exists():
    load_dotenv(env_path)

DATABASE_URL = os.getenv('DATABASE_URL')
if not DATABASE_URL:
    raise RuntimeError(
        'DATABASE_URL is not set. Please add DATABASE_URL to backend/.env or your environment.'
    )

# Parse URL to extract SSL parameters
parsed = urlparse(DATABASE_URL)
query_params = parse_qs(parsed.query)

# Build URL without query parameters (asyncpg doesn't accept them directly)
base_url = urlunparse((
    parsed.scheme,
    parsed.netloc,
    parsed.path,
    parsed.params,
    '',  # Empty query string
    parsed.fragment
))

# Prepare connection arguments for asyncpg
connect_args = {}
if 'sslmode' in query_params:
    sslmode = query_params['sslmode'][0]
    if sslmode == 'require':
        # Create SSL context for asyncpg
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = True
        ssl_context.verify_mode = ssl.CERT_REQUIRED
        connect_args['ssl'] = ssl_context

engine = create_async_engine(
    base_url,
    future=True,
    echo=False,
    connect_args=connect_args
)
metadata = MetaData()

predictions_table = Table(
    'predictions',
    metadata,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('created_at', DateTime(timezone=True), server_default=func.now(), nullable=False),
    Column('prediction', Integer, nullable=False),
    Column('confidence', Float, nullable=False),
    Column('status', String(32), nullable=False),
    Column('Days_for_shipping_real', Integer, nullable=False),
    Column('Days_for_shipment_scheduled', Integer, nullable=False),
    Column('Benefit_per_order', Float, nullable=False),
    Column('Sales_per_customer', Float, nullable=False),
    Column('Order_Item_Discount_Rate', Float, nullable=False),
    Column('Order_Item_Profit_Ratio', Float, nullable=False),
    Column('Order_Item_Quantity', Integer, nullable=False),
    Column('Sales', Float, nullable=False),
)


async def init_db() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(metadata.create_all)
