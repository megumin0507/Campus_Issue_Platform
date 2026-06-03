from sqlalchemy.orm import Session
from apps.backend.models.user import User


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: str) -> User | None:
    return db.query(User).filter(User.user_id == user_id).first()


def create_user(
    db: Session,
    user_id: str,
    name: str,
    email: str,
    hashed_password: str,
    role: str = "normal",
) -> User:
    user = User(
        user_id=user_id,
        name=name,
        email=email,
        hashed_password=hashed_password,
        role=role,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user