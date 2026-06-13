from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from apps.backend.db.base import Base
from apps.backend.db.session import engine

from apps.backend.models.user import User
from apps.backend.models.issue import Issue, IssueTimeline, RelatedEvent
from apps.backend.models.comment import Comment
from apps.backend.api.routes import auth, comments

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Campus Issue Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(comments.router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}