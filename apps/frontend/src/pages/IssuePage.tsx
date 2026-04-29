import { Link, useParams } from "react-router-dom";
import type { CSSProperties } from "react";

type TimelineItem = {
  id: string;
  date: string;
  title: string;
  description: string;
};

type RelatedEvent = {
  id: string;
  title: string;
};

type CommentPreview = {
  id: string;
  author: string;
  content: string;
};

type IssueDetail = {
  id: string;
  title: string;
  aiSummary: string;
  timeline: TimelineItem[];
  relatedEvents: RelatedEvent[];
  comments: CommentPreview[];
};

const pseudoIssues: IssueDetail[] = [
  {
    id: "issue-001",
    title: "台大校園突現便衣執法人員無預警抓人",
    aiSummary:
      "AI summary placeholder: 這項議題關於未經校方同意、無緊急必要，不但違反基本程序、比例原則與最小侵害原則之外校人士，擅自進入校園進行調查行為，其嚴重損害台大的國際聲譽與學術自由",
    timeline: [
      {
        id: "timeline-001",
        date: "2025-08-07",
        title: "數名未著制服、未出示證件之不明人士（後來於現場自稱為移民署人員），未向校方通報或取得同意，便擅自進入國立臺灣大學校園，至學生餐廳「小小福」進行查緝行動",
        description:
          "該些人員在查證該民眾為本國國民後，也並未對其攔查行為進行說明，轉而立即進入臺大學生餐廳「小小福」之廚房內，於盤查後帶走一名廚工。在整起行動中，無見校方代表陪同，更在學生會初步調查後，了解這些人員未在事前進行任何通報程序，在台大校方不知情的情況下進行攔查與抓離人員之行徑。至今被帶離人員之身分、去向及後續處理情形仍未獲得官方說明。",
      },
      
    ],
    relatedEvents: [
      {
        id: "event-001",
        title: "台大副校長陳良基：教育部讓警方逮捕記者非常可惡，嚴重侵害新聞自由",
      },
    ],
    comments: [
      {
        id: "comment-001",
        author: "匿名同學",
        content: "期待持續追蹤事件的發展，同樣事情再發生一次未必能合理落幕，希望學生會公開所有與議員和校方協調過程",
      },
      {
        id: "comment-002",
        author: "同學甲",
        content: "希望同學們都有相對應的意識，一起守護校園，確保每間在學校發生的事是立基於良善，並遵守程序",
      },
    ],
  },
  {
    id: "issue-002",
    title: "Student Club Regulation Revision",
    aiSummary:
      "AI summary placeholder: This issue concerns changes to student organization and club regulations. The main focus is how clubs are created, reviewed, and managed.",
    timeline: [
      {
        id: "timeline-003",
        date: "2025-12-08",
        title: "Student club regulation revision discussed",
        description:
          "A proposed revision related to student organizations and clubs was discussed in a meeting.",
      },
    ],
    relatedEvents: [
      {
        id: "event-002",
        title: "Student Union explains recent proposal",
      },
    ],
    comments: [],
  },
  {
    id: "issue-003",
    title: "Campus Counseling Resource Expansion",
    aiSummary:
      "AI summary placeholder: This issue is about improving student counseling and mental health support resources on campus.",
    timeline: [
      {
        id: "timeline-004",
        date: "2025-12-08",
        title: "Counseling resource discussion appears in meeting",
        description:
          "The meeting included student support and counseling-related reports.",
      },
    ],
    relatedEvents: [
      {
        id: "event-003",
        title: "Campus counseling resource discussion announced",
      },
    ],
    comments: [],
  },
  {
    id: "issue-004",
    title: "Course Selection System Feedback",
    aiSummary:
      "AI summary placeholder: This issue collects student concerns about course selection, including fairness, usability, and information transparency.",
    timeline: [
      {
        id: "timeline-005",
        date: "2025-12-20",
        title: "Students report course selection problems",
        description:
          "Students raised concerns about course availability and system usability.",
      },
    ],
    relatedEvents: [
      {
        id: "event-004",
        title: "Course selection feedback collected",
      },
    ],
    comments: [],
  },
  {
    id: "issue-005",
    title: "Campus Space Usage Policy",
    aiSummary:
      "AI summary placeholder: This issue is about how campus spaces are reserved, managed, and shared by students and organizations.",
    timeline: [
      {
        id: "timeline-006",
        date: "2025-12-22",
        title: "Campus space usage notice released",
        description:
          "The school announced temporary adjustments to campus space usage rules.",
      },
    ],
    relatedEvents: [
      {
        id: "event-005",
        title: "Campus space usage adjustment notice",
      },
    ],
    comments: [],
  },
];

function IssuePageTemplate({ issue }: { issue: IssueDetail }) {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <Link to="/" style={styles.backLink}>
          ← Back to Home
        </Link>

        <section style={styles.card}>
          <p style={styles.label}>Issue</p>
          <h1 style={styles.title}>{issue.title}</h1>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Timeline</h2>

          <div style={styles.timeline}>
            {issue.timeline.map((item) => (
              <div key={item.id} style={styles.timelineItem}>
                <div style={styles.timelineDate}>{item.date}</div>
                <div style={styles.timelineContent}>
                  <h3 style={styles.timelineTitle}>{item.title}</h3>
                  <p style={styles.paragraph}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>AI Summary</h2>
          <p style={styles.paragraph}>{issue.aiSummary}</p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Related Events</h2>

          <div style={styles.relatedEventList}>
            {issue.relatedEvents.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                style={styles.linkBox}
              >
                {event.title}
              </Link>
            ))}
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={styles.sectionTitle}>Comments</h2>

          {issue.comments.length > 0 ? (
            <div style={styles.commentList}>
              {issue.comments.map((comment) => (
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

export default function IssuePage() {
  const { issueId } = useParams();

  const issue = pseudoIssues.find((item) => item.id === issueId);

  if (!issue) {
    return (
      <main style={styles.page}>
        <section style={styles.container}>
          <Link to="/" style={styles.backLink}>
            ← Back to Home
          </Link>
          <section style={styles.card}>
            <h1 style={styles.title}>Issue not found</h1>
          </section>
        </section>
      </main>
    );
  }

  return <IssuePageTemplate issue={issue} />;
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
    margin: 0,
    fontSize: "16px",
    lineHeight: 1.6,
  },

  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  timelineItem: {
    display: "grid",
    gridTemplateColumns: "130px 1fr",
    gap: "16px",
    border: "2px solid #111827",
    backgroundColor: "#f9fafb",
    padding: "14px",
  },

  timelineDate: {
    fontWeight: 700,
    color: "#2563eb",
  },

  timelineContent: {
    borderLeft: "3px solid #111827",
    paddingLeft: "14px",
  },

  timelineTitle: {
    margin: "0 0 8px",
    fontSize: "18px",
  },

  relatedEventList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  linkBox: {
    display: "block",
    border: "2px solid #111827",
    backgroundColor: "#dbeafe",
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
};