from datetime import datetime
from sqlalchemy import DateTime, String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from apps.backend.db.base import Base


class Comment(Base):
    __tablename__ = "comments"

    comment_id: Mapped[str] = mapped_column(String, primary_key=True, index=True)
    issue_id: Mapped[str] = mapped_column(String, nullable=False, index=True)
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.user_id"), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    parent_id: Mapped[str | None] = mapped_column(
        String, ForeignKey("comments.comment_id"), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)

    user: Mapped["User"] = relationship("User")
