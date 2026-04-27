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
    title: "Dorm Management Policy Update",
    aiSummary:
      "AI summary placeholder: This issue is about recent changes to dormitory management rules. Students are concerned about clarity, fairness, and how the new policy will affect daily dorm life.",
    timeline: [
      {
        id: "timeline-001",
        date: "2025-12-08",
        title: "Meeting record mentions dormitory policy revision",
        description:
          "The student affairs meeting discussed revisions to the dormitory management policy.",
      },
      {
        id: "timeline-002",
        date: "2025-12-15",
        title: "Students begin discussing possible impact",
        description:
          "Students raised questions about rule enforcement and whether the policy was clearly explained.",
      },
    ],
    relatedEvents: [
      {
        id: "event-001",
        title: "Dormitory policy revision passed",
      },
    ],
    comments: [
      {
        id: "comment-001",
        author: "Anonymous Student",
        content: "I want to know what exactly changed in the dorm rules.",
      },
      {
        id: "comment-002",
        author: "Student A",
        content: "The timeline format makes this much easier to understand.",
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