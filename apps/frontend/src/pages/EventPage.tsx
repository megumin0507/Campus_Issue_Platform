import { Link, useParams } from "react-router-dom";
import type { CSSProperties } from "react";

type CommentPreview = {
  id: string;
  author: string;
  content: string;
};

type EventDetail = {
  id: string;
  title: string;
  time: string;
  content: string;
  sourceOrganization: string;
  sourceUrl: string;
  relatedIssue: {
    id: string;
    title: string;
  };
  comments: CommentPreview[];
};

const pseudoEvents: EventDetail[] = [
  {
    id: "event-001",
    title: "Dormitory policy revision passed",
    time: "2025-12-08",
    content:
      "The student affairs meeting discussed and approved updates to the dormitory management policy. The details are still being summarized for students.",
    sourceOrganization: "NTU Office of Student Affairs",
    sourceUrl: "https://www.instagram.com/ntusa.taiwan",
    relatedIssue: {
      id: "issue-001",
      title: "Dorm Management Policy Update",
    },
    comments: [
      {
        id: "comment-001",
        author: "Anonymous Student",
        content: "I hope the new dorm rules are explained more clearly.",
      },
      {
        id: "comment-002",
        author: "Student A",
        content: "A timeline would help me understand how this policy changed.",
      },
    ],
  },
  {
    id: "event-002",
    title: "Student Union explains recent proposal",
    time: "2025-12-08",
    content:
      "The Student Union posted an explanation about a recent student affairs proposal and invited students to give feedback.",
    sourceOrganization: "NTU Student Union",
    sourceUrl: "https://www.instagram.com/ntusa.taiwan",
    relatedIssue: {
      id: "issue-002",
      title: "Student Club Regulation Revision",
    },
    comments: [
      {
        id: "comment-003",
        author: "Student B",
        content: "This kind of explanation is useful, but I want more context.",
      },
    ],
  },
  {
    id: "event-003",
    title: "Campus counseling resource discussion announced",
    time: "2025-12-08",
    content:
      "A student-related meeting mentioned the need to improve counseling resources and student support services.",
    sourceOrganization: "NTU Office of Student Affairs",
    sourceUrl: "https://www.instagram.com/ntusa.taiwan",
    relatedIssue: {
      id: "issue-003",
      title: "Campus Counseling Resource Expansion",
    },
    comments: [],
  },
  {
    id: "event-004",
    title: "Course selection feedback collected",
    time: "2025-12-08",
    content:
      "Students raised feedback about the course selection system, including usability, fairness, and information clarity.",
    sourceOrganization: "NTU Student Union",
    sourceUrl: "https://www.instagram.com/ntusa.taiwan",
    relatedIssue: {
      id: "issue-004",
      title: "Course Selection System Feedback",
    },
    comments: [],
  },
  {
    id: "event-005",
    title: "校發會110學年度第5次會議：未來機車將不由長興街進出校園",
    time: "2022-04-27",
    content:
      "現況鄰近基隆路/長興街口現有約4,430床位的學生宿舍，未來將研擬增建3,750床位於，其所衍生之學生往返校總區的自行車旅次，將大量增加使用長興街校門口之自行車流量。由此未來規劃機車將不由長興街進出校園，故針對基隆路三段、長興街及舟山路所夾該區之交通動線調整進行規劃，改善長興街校門口交通通行情況。 ",
    sourceOrganization: "校園規劃小組",
    sourceUrl: "https://osa.ntu.edu.tw/6688444",
    relatedIssue: {
      id: "issue-005",
      title: "Campus Space Usage Policy",
    },
    comments: [],
  },
  {
    id: "event-006",
    title: "邀集校內相關單位 學府里及工務局 交通觸及台北市自來水事業處等單位會勘",
    time: "2022-11-11",
    content:
      "未來舟山路底開口採經與會單位原則同意，以老師使用方便及安全管理為原則。",
    sourceOrganization: "校園規劃小組",
    sourceUrl: "https://www.instagram.com/ntusa.taiwan",
    relatedIssue: {
      id: "issue-005",
      title: "Campus Space Usage Policy",
    },
    comments: [],
  },
  {
    id: "event-007",
    title: "短期工程－機車破口：舟山路底（基隆路三段30巷）開闢機車出入口工程規劃設計",
    time: "2023-03-14",
    content:
      "112年03月14日~113年2月5日進行「舟山路底(基隆路三段30巷)開闢機車出入口工程」規劃設計至工程完工",
    sourceOrganization: "校園規劃小組",
    sourceUrl: "https://www.instagram.com/ntusa.taiwan",
    relatedIssue: {
      id: "issue-005",
      title: "Campus Space Usage Policy",
    },
    comments: [],
  },
  {
    id: "event-008",
    title: "長興街校門口拓寬工程",
    time: "2024-10-09",
    content:
      "「自行車空橋工程」替代方案交通影響評估討論會議結論第一點「即刻進行方案一(長興街拓寬)約1~1.5年做有效調整，提前讓現有長興舍區住宿學生習慣，於拓寬後觀察實際往返校總區之人、自行車流交通情形，…。",
    sourceOrganization: "校園規劃小組",
    sourceUrl: "https://www.instagram.com/ntusa.taiwan",
    relatedIssue: {
      id: "issue-005",
      title: "Campus Space Usage Policy",
    },
    comments: [],
  },
  {
    id: "event-009",
    title: "明達館側戶外環境改善工程基本設計",
    time: "2026-04-08",
    content:
      "長興街為校園內重要之東側通學動線與交通節點，設計出最完善動線其中包含一．自行車道拓寬 二．動線調整及部分圍牆拆除 三．明達館機車停車格及中庭景觀 四．舟山路自行車穿線規劃及路緣線型調整",
    sourceOrganization: "校園規劃小組委員會",
    sourceUrl: "https://www.instagram.com/ntusa.taiwan",
    relatedIssue: {
      id: "issue-005",
      title: "Campus Space Usage Policy",
    },
    comments: [],
  },
];

function EventPageTemplate({ event }: { event: EventDetail }) {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <Link to="/" style={styles.backLink}>
          ← Back to Home
        </Link>

        <section style={styles.card}>
          <p style={styles.label}>Event</p>
          
          <div style={styles.titleRow}>
            <h1 style={styles.title}>{event.title}</h1>
            <p style={styles.eventTime}>{event.time}</p>
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>What happened?</h2>
          <p style={styles.paragraph}>{event.content}</p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Source</h2>

          <p style={styles.paragraph}>
            <strong>Organization:</strong> {event.sourceOrganization}
          </p>

          <p style={styles.paragraph}>
            <strong>URL:</strong>{" "}
            <a href={event.sourceUrl} target="_blank" rel="noreferrer">
              {event.sourceUrl}
            </a>
          </p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Related Issue</h2>

          <Link to={`/issues/${event.relatedIssue.id}`} style={styles.linkBox}>
            {event.relatedIssue.title}
          </Link>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Comments</h2>

          {event.comments.length > 0 ? (
            <div style={styles.commentList}>
              {event.comments.map((comment) => (
                <div key={comment.id} style={styles.commentItem}>
                  <strong>{comment.author}</strong>
                  <p style={styles.commentText}>{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.mutedText}>No comments yet.</p>
          )}

          <textarea
            style={styles.commentEditor}
            placeholder="Comment function will be implemented later."
            disabled
          />
        </section>
      </section>
    </main>
  );
}

export default function EventPage() {
  const { eventId } = useParams();

  const event = pseudoEvents.find((item) => item.id === eventId);

  if (!event) {
    return (
      <main style={styles.page}>
        <section style={styles.container}>
          <Link to="/" style={styles.backLink}>
            ← Back to Home
          </Link>
          <section style={styles.card}>
            <h1 style={styles.title}>Event not found</h1>
          </section>
        </section>
      </main>
    );
  }

  return <EventPageTemplate event={event} />;
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "24px",
    fontFamily: "Arial, Helvetica, sans-serif",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  backLink: {
    display: "inline-block",
    marginBottom: "16px",
    color: "#111827",
    textDecoration: "none",
    fontWeight: 700,
  },

  card: {
    backgroundColor: "#ffffff",
    border: "3px solid #111827",
    padding: "20px",
    marginBottom: "16px",
    boxSizing: "border-box",
  },

  label: {
    margin: "0 0 8px",
    color: "#6b7280",
    fontWeight: 700,
    textTransform: "uppercase",
  },

  title: {
    margin: 0,
    fontSize: "32px",
  },

  sectionTitle: {
    margin: "0 0 12px",
    fontSize: "22px",
  },

  paragraph: {
    margin: "0 0 8px",
    fontSize: "16px",
    lineHeight: 1.6,
  },

  linkBox: {
    display: "block",
    border: "2px solid #111827",
    backgroundColor: "#fef3c7",
    padding: "14px",
    color: "#111827",
    textDecoration: "none",
    fontWeight: 700,
  },

  commentList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "12px",
  },

  commentItem: {
    border: "2px solid #111827",
    backgroundColor: "#f9fafb",
    padding: "12px",
  },

  commentText: {
    margin: "6px 0 0",
  },

  mutedText: {
    color: "#6b7280",
  },

  commentEditor: {
    width: "100%",
    minHeight: "80px",
    border: "2px solid #111827",
    padding: "12px",
    boxSizing: "border-box",
    resize: "vertical",
  },

  titleRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "16px",
  },

  eventTime: {
    margin: 0,
    minWidth: "160px",
    textAlign: "right",
    color: "#6b7280",
    fontWeight: 700,
    fontSize: "14px",
  },
};