from sqlalchemy.orm import Session

from apps.backend.models.comment import Comment


def get_top_level_comments(db: Session, issue_id: str) -> list[Comment]:
    return (
        db.query(Comment)
        .filter(Comment.issue_id == issue_id, Comment.parent_id == None)
        .order_by(Comment.created_at)
        .all()
    )


def get_replies(db: Session, parent_id: str) -> list[Comment]:
    return (
        db.query(Comment)
        .filter(Comment.parent_id == parent_id)
        .order_by(Comment.created_at)
        .all()
    )


def create_comment(
    db: Session,
    comment_id: str,
    issue_id: str,
    user_id: str,
    content: str,
    parent_id: str | None = None,
) -> Comment:
    comment = Comment(
        comment_id=comment_id,
        issue_id=issue_id,
        user_id=user_id,
        content=content,
        parent_id=parent_id,
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment
