import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./campus_issue.db")
    jwt_secret_key: str = os.getenv("JWT_SECRET_KEY", "dev-secret-key")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))


settings = Settings()