from datetime import datetime
from sqlalchemy import DateTime, String, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from apps.backend.db.base import Base


class Issue(Base):
    __tablename__ = "issues"

    issue_id: Mapped[str] = mapped_column(String, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    ai_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)

    timelines: Mapped[list["IssueTimeline"]] = relationship(
        "IssueTimeline", back_populates="issue", order_by="IssueTimeline.order_index"
    )
    related_events: Mapped[list["RelatedEvent"]] = relationship(
        "RelatedEvent", back_populates="issue"
    )


class IssueTimeline(Base):
    __tablename__ = "issue_timelines"

    timeline_id: Mapped[str] = mapped_column(String, primary_key=True, index=True)
    issue_id: Mapped[str] = mapped_column(String, ForeignKey("issues.issue_id"), nullable=False)
    date: Mapped[str] = mapped_column(String, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    issue: Mapped["Issue"] = relationship("Issue", back_populates="timelines")


class RelatedEvent(Base):
    __tablename__ = "related_events"

    event_id: Mapped[str] = mapped_column(String, primary_key=True, index=True)
    issue_id: Mapped[str] = mapped_column(String, ForeignKey("issues.issue_id"), nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)

    issue: Mapped["Issue"] = relationship("Issue", back_populates="related_events")
