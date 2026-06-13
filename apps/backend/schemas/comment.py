from datetime import datetime
from pydantic import BaseModel


class CommentRequest(BaseModel):
    content: str
    parent_id: str | None = None


class CommentResponse(BaseModel):
    comment_id: str
    content: str
    author_name: str
    parent_id: str | None
    created_at: datetime
    replies: list["CommentResponse"] = []

    class Config:
        from_attributes = True


CommentResponse.model_rebuild()
