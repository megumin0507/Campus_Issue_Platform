from uuid import uuid4
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from apps.backend.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from apps.backend.repositories.user_repository import (
    create_user,
    get_user_by_email,
)
from apps.backend.schemas.auth import RegisterRequest, LoginRequest, AuthResponse


def register_user(db: Session, data: RegisterRequest) -> AuthResponse:
    existing_user = get_user_by_email(db, data.email)

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = create_user(
        db=db,
        user_id=str(uuid4()),
        name=data.name,
        email=data.email,
        hashed_password=hash_password(data.password),
        role="normal",
    )

    token = create_access_token(user.user_id)

    return AuthResponse(access_token=token, user=user)


def login_user(db: Session, data: LoginRequest) -> AuthResponse:
    user = get_user_by_email(db, data.email)

    if user is None or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(user.user_id)

    return AuthResponse(access_token=token, user=user)