import { Link } from "react-router-dom";

type IssuePreview = {
  id: string;
  title: string;
  description: string;
};

type EventPreview = {
  id: string;
  title: string;
  summary: string;
};

type CommentPreview = {
  id: string;
  author: string;
  content: string;
  relatedIssue: string;
};

const pseudoIssues: IssuePreview[] = [
  {
    id: "issue-001",
    title: "Dorm Management Policy Update",
    description: "Recent discussion about dormitory rules and student feedback.",
  },
  {
    id: "issue-002",
    title: "Student Club Regulation Revision",
    description: "Updates about student organization and club management rules.",
  },
  {
    id: "issue-003",
    title: "Campus Counseling Resource Expansion",
    description: "Discussion about improving student support resources.",
  },
  {
    id: "issue-004",
    title: "Course Selection System Feedback",
    description: "Student opinions about course selection and system usability.",
  },
  {
    id: "issue-005",
    title: "Campus Space Usage Policy",
    description: "Ongoing discussion about public space usage on campus.",
  },
];

const pseudoEvents: EventPreview[] = [
  {
    id: "event-001",
    title: "[News] Dormitory policy revision passed",
    summary:
      "AI summary placeholder: The meeting record mentions updates to dormitory management rules and related implementation details.",
  },
  {
    id: "event-002",
    title: "[Post] Student Union explains recent proposal",
    summary:
      "AI summary placeholder: The post explains the background of a student affairs proposal and invites students to give feedback.",
  },
  {
    id: "event-003",
    title: "[Issue] Recent campus discussion announced",
    summary:
      "AI summary placeholder: This event is connected to a larger campus issue and may become part of the issue timeline.",
  },
  {
    id: "event-004",
    title: "[Meeting] Counseling committee meeting record",
    summary:
      "AI summary placeholder: The record includes several student-related policy updates and administrative decisions.",
  },
  {
    id: "event-005",
    title: "[Notice] Campus space usage adjustment",
    summary:
      "AI summary placeholder: The notice describes temporary changes to space reservation and usage rules.",
  },
];

const pseudoComments: CommentPreview[] = [
  {
    id: "comment-001",
    author: "Anonymous Student",
    content: "I think the dorm rule update needs a clearer explanation.",
    relatedIssue: "Dorm Management Policy Update",
  },
  {
    id: "comment-002",
    author: "Student A",
    content: "It would be nice if the platform can show the full timeline.",
    relatedIssue: "Student Club Regulation Revision",
  },
  {
    id: "comment-003",
    author: "Student B",
    content: "I only heard about this issue from friends, so a summary helps.",
    relatedIssue: "Campus Counseling Resource Expansion",
  },
];

export default function HomePage() {
  return (
    <main style={styles.page}>

        <section style={styles.marqueeBox}>
          <button style={styles.arrowButton}>‹</button>
          <h1 style={styles.marqueeText}>Campus Issue Platform</h1>
          <button style={styles.arrowButton}>›</button>
        </section>

        <section style={styles.middleSection}>
          <section style={styles.commentWall}>
            <div style={styles.verticalLabel}>意見牆</div>

            <div style={styles.commentList}>
              {pseudoComments.map((comment) => (
                <div key={comment.id} style={styles.commentBubble}>
                  <strong>{comment.author}</strong>
                  <p style={styles.commentText}>{comment.content}</p>
                  <span style={styles.commentIssue}>[{comment.relatedIssue}]</span>
                </div>
              ))}
            </div>
          </section>

          <section style={styles.latestNewsSection}>
            <div style={styles.latestNewsBox}>
              <div style={styles.verticalLabel}>最新消息</div>

              <div style={styles.issueList}>
                {pseudoIssues.map((issue, index) => (
                  <Link
                    key={issue.id}
                    to={`/issues/${issue.id}`}
                    style={styles.issueItem}
                  >
                    <span style={styles.issueNumber}>{index + 1}.</span>
                    <div>
                      <h3 style={styles.issueTitle}>{issue.title}</h3>
                      <p style={styles.issueDescription}>{issue.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </section>

        <section style={styles.eventSection}>
          <div style={styles.eventScroller}>
            {pseudoEvents.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                style={styles.eventCard}
              >
                <h2 style={styles.eventTitle}>{event.title}</h2>

                <div style={styles.summaryBox}>
                  <strong>AI 摘要</strong>
                  <p style={styles.summaryText}>{event.summary}</p>
                </div>

              </Link>
            ))}
          </div>
        </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "24px",
    boxSizing: "border-box",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  tab: {
    width: "220px",
    height: "30px",
    border: "3px solid #111827",
    borderBottom: "none",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    padding: "6px 12px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    fontSize: "14px",
  },

  marqueeBox: {
    height: "86px",
    margin: "14px",
    border: "3px solid #111827",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    boxSizing: "border-box",
    backgroundColor: "#e5e7eb",
  },

  marqueeText: {
    margin: 0,
    fontSize: "32px",
    letterSpacing: "4px",
  },

  arrowButton: {
    border: "none",
    backgroundColor: "transparent",
    fontSize: "32px",
    cursor: "default",
  },

  middleSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1.15fr",
    gap: "16px",
    margin: "0 14px 12px",
  },

  commentWall: {
    height: "160px",
    border: "3px solid #111827",
    display: "flex",
    backgroundColor: "#dbeafe",
    overflow: "hidden",
  },

  verticalLabel: {
    width: "58px",
    borderRight: "3px solid #111827",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    writingMode: "vertical-rl",
    fontSize: "24px",
    fontWeight: 700,
    backgroundColor: "#f9fafb",
  },

  commentList: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    gap: "10px",
    padding: "12px",
    overflow: "hidden",
  },

  commentBubble: {
    maxWidth: "220px",
    backgroundColor: "#ffffff",
    border: "2px solid #111827",
    borderRadius: "999px",
    padding: "8px 14px",
  },

  commentText: {
    margin: "4px 0",
    fontSize: "13px",
  },

  commentIssue: {
    color: "#dc2626",
    fontSize: "12px",
    fontWeight: 700,
  },

  latestNewsSection: {
    height: "180px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  latestNewsBox: {
    flex: 1,
    border: "3px solid #111827",
    display: "flex",
    overflow: "hidden",
    backgroundColor: "#fef3c7",
  },

  issueList: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    boxSizing: "border-box",
  },

  issueItem: {
    display: "flex",
    gap: "10px",
    padding: "10px",
    marginBottom: "8px",
    border: "2px solid #111827",
    backgroundColor: "#ffffff",
    color: "#111827",
    textDecoration: "none",
  },

  issueNumber: {
    fontWeight: 700,
  },

  issueTitle: {
    margin: 0,
    fontSize: "16px",
  },

  issueDescription: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#4b5563",
  },

  eventSection: {
    margin: "0 14px 14px",
    border: "3px solid #111827",
    backgroundColor: "#ecfdf5",
  },

  eventScroller: {
    display: "flex",
    gap: "12px",
    overflowX: "auto",
    padding: "12px",
    boxSizing: "border-box",
  },

  eventCard: {
    flex: "0 0 260px",
    minHeight: "260px",
    border: "3px solid #111827",
    backgroundColor: "#ffffff",
    color: "#111827",
    textDecoration: "none",
    padding: "14px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },

  eventTitle: {
    margin: "0 0 14px",
    fontSize: "20px",
    lineHeight: 1.25,
  },

  summaryBox: {
    border: "3px solid #111827",
    backgroundColor: "#f3f4f6",
    padding: "10px",
  },

  summaryText: {
    margin: "8px 0 0",
    fontSize: "14px",
    lineHeight: 1.4,
  },

  eventFooter: {
    marginTop: "auto",
    textAlign: "right",
    fontWeight: 700,
  },
};