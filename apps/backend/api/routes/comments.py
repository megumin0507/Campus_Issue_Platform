from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from apps.backend.api.deps import get_db, get_current_user
from apps.backend.models.user import User
from apps.backend.schemas.comment import CommentRequest, CommentResponse
from apps.backend.services.comment_service import list_comments, post_comment

router = APIRouter(prefix="/issues", tags=["comments"])


@router.get("/{issue_id}/comments", response_model=list[CommentResponse])
def get_comments(issue_id: str, db: Session = Depends(get_db)):
    return list_comments(db, issue_id)


@router.post("/{issue_id}/comments", response_model=CommentResponse)
def add_comment(
    issue_id: str,
    data: CommentRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return post_comment(db, issue_id, data, current_user)
