from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from apps.backend.api.deps import get_db, get_current_user
from apps.backend.models.user import User
from apps.backend.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    AuthResponse,
    UserResponse,
)
from apps.backend.services.auth_service import register_user, login_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=AuthResponse)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    return register_user(db, data)


@router.post("/login", response_model=AuthResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    return login_user(db, data)


@router.get("/me", response_model=UserResponse)
def me(current_user: User = Depends(get_current_user)):
    return current_user