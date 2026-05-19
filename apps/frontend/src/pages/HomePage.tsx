import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";

import AddEventModal from "../components/AddEventModal";
import ProposeIssueModal from "../components/ProposeIssueModal";

type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  summary: string;
};

type HotIssue = {
  id: string;
  title: string;
  summary: string;
  events: TimelineEvent[];
};

const hotIssue: HotIssue = {
  id: "issue-001",
  title: "台大校園突現便衣執法人員無預警抓人",
  summary:
    "學生會譴責非法盤查、要求移民署說明程序與現況，事件持續發酵中。",
  events: [
    {
      id: "event-001",
      date: "2025-08-07",
      title: "便衣人員進入校園",
      summary: "未著制服人員擅自進入小小福進行查緝。",
    },
    {
      id: "event-002",
      date: "2025-08-10",
      title: "學生會發布聲明",
      summary: "學生會公開譴責並要求說明。",
    },
    {
      id: "event-003",
      date: "2025-08-15",
      title: "校方回應進度",
      summary: "校方說明已啟動內部調查程序。",
    },
    {
      id: "event-004",
      date: "2025-08-22",
      title: "公聽會召開",
      summary: "邀請各方代表討論校園安全。",
    },
  ],
};

const proposableEvents = [
  { id: "event-001", title: "便衣人員進入校園" },
  { id: "event-002", title: "學生會發布聲明" },
  { id: "event-003", title: "校方回應進度" },
  { id: "event-004", title: "公聽會召開" },
  { id: "event-005", title: "BOT宿舍電價調漲公聽會" },
];

function formatShortDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [proposeOpen, setProposeOpen] = useState(false);

  const sortedEvents = [...hotIssue.events].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <main style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.topBar}>
          <button
            type="button"
            style={styles.loginButton}
            onClick={() => console.log("login clicked")}
          >
            <span style={styles.userIcon} aria-hidden="true">
              👤
            </span>
            login
          </button>
        </div>

        <div style={styles.contentGrid}>
          <h1 style={styles.heroTitle}>HOT ISSUE</h1>

          <Link to={`/issues/${hotIssue.id}`} style={styles.hotIssueTitle}>
            {hotIssue.title}
          </Link>

          <p style={styles.hotIssueSummary}>{hotIssue.summary}</p>

          <button
            type="button"
            style={styles.proposeBtn}
            onClick={() => setProposeOpen(true)}
          >
            + propose new issue
          </button>

          <h2 style={styles.timelineHeading}>TIMELINE</h2>

          <button
            type="button"
            style={styles.addEventBtn}
            onClick={() => setAddEventOpen(true)}
          >
            + add new event
          </button>

          <div style={styles.timelineScroller}>
            {sortedEvents.map((ev) => (
              <div key={ev.id} style={styles.timelineRow}>
                <Link to={`/events/${ev.id}`} style={styles.timelineNode}>
                  <div style={styles.timelineDate}>
                    {formatShortDate(ev.date)}
                  </div>
                  <div style={styles.timelineTitle}>{ev.title}</div>
                  <div style={styles.timelineSummary}>{ev.summary}</div>
                </Link>
                <span style={styles.arrow}>→</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            style={styles.moreIssueBtn}
            onClick={() => navigate("/overview")}
          >
            more issue
          </button>
        </div>
      </div>

      <AddEventModal
        open={addEventOpen}
        onClose={() => setAddEventOpen(false)}
      />

      <ProposeIssueModal
        open={proposeOpen}
        onClose={() => setProposeOpen(false)}
        events={proposableEvents}
      />
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    position: "relative",
    backgroundImage: "url('/home_back.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: "'Noto Serif TC', Arial, Helvetica, sans-serif",
    boxSizing: "border-box",
  },

  overlay: {
    minHeight: "100vh",
    background:
      "linear-gradient(to right, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 55%)",
    padding: "32px clamp(24px, 5vw, 64px) 48px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },

  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "16px",
  },

  loginButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    color: "#7a5d41",
    fontSize: "1.05rem",
    fontWeight: 600,
  },

  userIcon: {
    fontSize: "1.3rem",
    color: "#7a5d41",
  },

  contentGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gridTemplateRows: "auto auto auto auto auto auto",
    columnGap: "32px",
    rowGap: "16px",
    alignItems: "start",
  },

  heroTitle: {
    gridColumn: 1,
    gridRow: 1,
    margin: 0,
    fontSize: "clamp(5rem, 10vw, 9rem)",
    fontWeight: 900,
    letterSpacing: "0.05em",
    color: "#331c06",
    lineHeight: 1,
  },

  hotIssueTitle: {
    gridColumn: 1,
    gridRow: 2,
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#331c06",
    textDecoration: "none",
    lineHeight: 1.3,
    marginTop: "8px",
    maxWidth: "820px",
  },

  hotIssueSummary: {
    gridColumn: 1,
    gridRow: 3,
    margin: 0,
    fontSize: "1.1rem",
    color: "#633d19",
    lineHeight: 1.9,
    maxWidth: "720px",
  },

  proposeBtn: {
    gridColumn: 2,
    gridRow: "2 / 4",
    alignSelf: "center",
    justifySelf: "end",
    background: "#553312",
    color: "#fffbf2",
    border: "none",
    height: "48px",
    minWidth: "220px",
    padding: "0 28px",
    cursor: "pointer",
    fontFamily: "'Noto Serif TC', Arial, Helvetica, sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: "4px",
    whiteSpace: "nowrap",
  },

  timelineHeading: {
    gridColumn: 1,
    gridRow: 4,
    margin: "32px 0 0",
    fontSize: "3rem",
    fontWeight: 800,
    letterSpacing: "0.05em",
    color: "#553312",
    textTransform: "uppercase",
    lineHeight: 1,
  },

  addEventBtn: {
    gridColumn: 2,
    gridRow: 4,
    alignSelf: "end",
    justifySelf: "end",
    background: "#553312",
    color: "#fffbf2",
    border: "none",
    height: "48px",
    minWidth: "220px",
    padding: "0 28px",
    cursor: "pointer",
    fontFamily: "'Noto Serif TC', Arial, Helvetica, sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: "4px",
    whiteSpace: "nowrap",
  },

  timelineScroller: {
    gridColumn: "1 / -1",
    gridRow: 5,
    display: "flex",
    alignItems: "stretch",
    gap: "8px",
    overflowX: "auto",
    padding: "8px 0 16px",
  },

  timelineRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: "0 0 auto",
  },

  timelineNode: {
    flex: "0 0 220px",
    minHeight: "140px",
    padding: "16px",
    boxSizing: "border-box",
    backgroundColor: "rgba(122, 93, 65, 0.7)",
    textDecoration: "none",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  timelineDate: {
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#fffbf2",
  },

  timelineTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#fffbf2",
    lineHeight: 1.3,
  },

  timelineSummary: {
    fontSize: "0.85rem",
    color: "#fffbf2",
    opacity: 0.9,
    lineHeight: 1.5,
  },

  arrow: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#553312",
  },

  moreIssueBtn: {
    gridColumn: 2,
    gridRow: 6,
    justifySelf: "end",
    marginTop: "16px",
    border: "2px solid #553312",
    backgroundColor: "transparent",
    color: "#553312",
    padding: "10px 24px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "4px",
    whiteSpace: "nowrap",
  },
};
