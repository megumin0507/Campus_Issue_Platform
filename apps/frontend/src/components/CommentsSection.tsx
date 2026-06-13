import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { getComments, postComment } from "../api/comments";
import type { CommentResponse } from "../api/comments";

export default function CommentsSection({ threadId }: { threadId: string }) {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; author: string } | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoggedIn = !!localStorage.getItem("access_token");
  const replyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getComments(threadId).then(setComments).catch(() => {});
  }, [threadId]);

  async function handleSubmit() {
    if (!text.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const newComment = await postComment(threadId, text.trim());
      setComments((prev) => [...prev, newComment]);
      setText("");
    } catch {
      setError("留言失敗，請確認已登入。");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReply(parentId: string) {
    if (!replyText.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const newReply = await postComment(threadId, replyText.trim(), parentId);
      setComments((prev) =>
        prev.map((c) =>
          c.comment_id === parentId
            ? { ...c, replies: [...c.replies, newReply] }
            : c
        )
      );
      setReplyTo(null);
      setReplyText("");
    } catch {
      setError("回覆失敗，請確認已登入。");
    } finally {
      setSubmitting(false);
    }
  }

  function openReply(id: string, author: string) {
    setReplyTo({ id, author });
    setReplyText("");
    setTimeout(() => replyRef.current?.focus(), 50);
  }

  return (
    <section style={s.card}>
      <h2 style={s.sectionTitle}>Comments</h2>

      {comments.length === 0 && <p style={s.mutedText}>No comments yet.</p>}

      <div style={s.commentList}>
        {comments.map((comment) => (
          <div key={comment.comment_id}>
            <div style={s.commentItem}>
              <strong style={{ color: "#553312" }}>{comment.author_name}</strong>
              <p style={s.commentText}>{comment.content}</p>
              {isLoggedIn && (
                <button
                  style={s.replyBtn}
                  onClick={() => openReply(comment.comment_id, comment.author_name)}
                >
                  回覆
                </button>
              )}
            </div>

            {comment.replies.length > 0 && (
              <div style={s.replyList}>
                {comment.replies.map((reply) => (
                  <div key={reply.comment_id} style={s.replyItem}>
                    <strong style={{ color: "#553312" }}>{reply.author_name}</strong>
                    <p style={s.commentText}>{reply.content}</p>
                  </div>
                ))}
              </div>
            )}

            {replyTo?.id === comment.comment_id && (
              <div style={s.replyEditor}>
                <p style={{ margin: "0 0 6px", color: "#7a5d41", fontSize: "14px" }}>
                  回覆 {replyTo.author}：
                </p>
                <textarea
                  ref={replyRef}
                  style={s.commentEditor}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="輸入回覆..."
                />
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button
                    style={s.submitBtn}
                    onClick={() => handleReply(comment.comment_id)}
                    disabled={submitting}
                  >
                    送出回覆
                  </button>
                  <button style={s.cancelBtn} onClick={() => setReplyTo(null)}>
                    取消
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}

      {isLoggedIn ? (
        <div style={{ marginTop: "16px" }}>
          <textarea
            style={s.commentEditor}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="留下你的想法..."
          />
          <button
            style={{ ...s.submitBtn, marginTop: "8px" }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "送出中..." : "送出留言"}
          </button>
        </div>
      ) : (
        <p style={{ ...s.mutedText, marginTop: "16px" }}>
          <Link to="/login" style={{ color: "#553312" }}>
            登入
          </Link>{" "}
          後才能留言。
        </p>
      )}
    </section>
  );
}

const s: Record<string, CSSProperties> = {
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    border: "2px solid #633d19",
    borderRadius: "12px",
    padding: "24px 28px",
    marginBottom: "16px",
    boxSizing: "border-box",
  },
  sectionTitle: {
    margin: "0 0 12px",
    fontSize: "22px",
    color: "#7a5d41",
  },
  mutedText: { color: "#7a5d41" },
  commentList: { display: "flex", flexDirection: "column", gap: "10px" },
  commentItem: {
    border: "2px solid #633d19",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "12px",
    padding: "12px",
    color: "#553312",
  },
  commentText: { margin: "6px 0 0", color: "#633d19" },
  replyList: {
    marginLeft: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "8px",
  },
  replyItem: {
    border: "1.5px solid #b08060",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: "10px",
    padding: "10px 12px",
    color: "#553312",
  },
  replyEditor: { marginLeft: "32px", marginTop: "8px", marginBottom: "8px" },
  replyBtn: {
    marginTop: "6px",
    background: "none",
    border: "none",
    color: "#7a5d41",
    cursor: "pointer",
    fontSize: "13px",
    padding: 0,
    textDecoration: "underline",
  },
  commentEditor: {
    width: "100%",
    minHeight: "80px",
    border: "2px solid #633d19",
    borderRadius: "12px",
    padding: "12px",
    boxSizing: "border-box",
    resize: "vertical",
    color: "#633d19",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  submitBtn: {
    backgroundColor: "#633d19",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 18px",
    cursor: "pointer",
    fontWeight: 700,
  },
  cancelBtn: {
    backgroundColor: "transparent",
    color: "#7a5d41",
    border: "1.5px solid #b08060",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
  },
};
