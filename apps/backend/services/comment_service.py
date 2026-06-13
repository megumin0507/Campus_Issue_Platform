from uuid import uuid4
from sqlalchemy.orm import Session

from apps.backend.models.user import User
from apps.backend.repositories.comment_repository import (
    create_comment,
    get_top_level_comments,
    get_replies,
)
from apps.backend.schemas.comment import CommentRequest, CommentResponse


def _to_response(comment, db: Session) -> CommentResponse:
    replies = get_replies(db, comment.comment_id)
    return CommentResponse(
        comment_id=comment.comment_id,
        content=comment.content,
        author_name=comment.user.name,
        parent_id=comment.parent_id,
        created_at=comment.created_at,
        replies=[
            CommentResponse(
                comment_id=r.comment_id,
                content=r.content,
                author_name=r.user.name,
                parent_id=r.parent_id,
                created_at=r.created_at,
                replies=[],
            )
            for r in replies
        ],
    )


def list_comments(db: Session, issue_id: str) -> list[CommentResponse]:
    comments = get_top_level_comments(db, issue_id)
    return [_to_response(c, db) for c in comments]


def post_comment(
    db: Session,
    issue_id: str,
    data: CommentRequest,
    current_user: User,
) -> CommentResponse:
    comment = create_comment(
        db=db,
        comment_id=str(uuid4()),
        issue_id=issue_id,
        user_id=current_user.user_id,
        content=data.content,
        parent_id=data.parent_id,
    )
    return _to_response(comment, db)
