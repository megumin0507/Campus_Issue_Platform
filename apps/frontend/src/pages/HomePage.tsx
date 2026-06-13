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

const hotIssues: HotIssue[] = [
  {
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
        date: "2025-08-08",
        title: "學生會學權部發布聲明",
        summary: "學生會公開譴責並提出三項訴求，並持續監督事件後續進展。",
      },
      {
        id: "event-012",
        date: "2025-08-08",
        title: "移民署公開發文",
        summary: "表示已於8月8日上午與台灣大學秘書、校方人員及學生會代表進行溝通與達成共識，深表歉意。",
      },
     
    ],
  },
  {
    id: "issue-002",
    title: "對於增建學生宿舍而增加長興街校門口交通流量之對策",
    summary:
      "對於因應117年新增3,000床學生宿舍所帶來的行人與自行車流量，同時改善尖峰時段人車爭道與動線交織問題。",
    events: [
      {
        id: "event-005",
        date: "2022-04-27",
        title: "校發會110學年度第5次會議",
        summary: "未來機車將不由長興街進出校園。",
      },
      {
        id: "event-006",
        date: "2022-11-11",
        title: "進行規劃前會勘",
        summary:
          "邀集校內相關單位 學府里及工務局 交通處及台北市自來水事業處等單位會勘。",
      },
      {
        id: "event-007",
        date: "2023-03-14",
        title: "機車出入配套措施",
        summary:
          "進行「舟山路底(基隆路三段30巷)開闢機車出入口工程」。",
      },
      {
        id: "event-008",
        date: "2024-10-09",
        title: "長興街校門口拓寬工程",
        summary:
          "提前讓現有長興舍區住宿學生習慣，於拓寬後觀察實際往返校總區之人、自行車流交通情形。",
      },
      {
        id: "event-009",
        date: "2026-04-08",
        title: "明達館側戶外環境改善工程基本設計",
        summary:
          "對此校園重要東側通學路線與交通節點進行動線改善設計。",
      },
    ],
  },
];

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

          {hotIssues.map((issue) => {
            const sortedEvents = [...issue.events].sort((a, b) =>
              a.date.localeCompare(b.date)
            );

            return (
              <section key={issue.id} style={styles.issueSection}>
                <Link to={`/issues/${issue.id}`} style={styles.hotIssueTitle}>
                  {issue.title}
                </Link>

                <p style={styles.hotIssueSummary}>{issue.summary}</p>

                <div style={styles.issueButtons}>
                  <button
                    type="button"
                    style={styles.proposeBtn}
                    onClick={() => setProposeOpen(true)}
                  >
                    + propose new issue
                  </button>

                  <button
                    type="button"
                    style={styles.addEventBtn}
                    onClick={() => setAddEventOpen(true)}
                  >
                    + add new event
                  </button>
                </div>

                <h2 style={styles.timelineHeading}>TIMELINE</h2>

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
              </section>
            );
          })}

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
    backgroundAttachment: "fixed",
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
    gridTemplateRows: "auto min-content auto auto",
    columnGap: "32px",
    rowGap: "16px",
    alignItems: "start",
  },

  heroTitle: {
    gridColumn: "1 / -1",
    gridRow: 1,
    margin: 0,
    fontSize: "clamp(5rem, 10vw, 9rem)",
    fontWeight: 900,
    letterSpacing: "0.05em",
    color: "#331c06",
    lineHeight: 1,
  },

  issueSection: {
    gridColumn: "1 / -1",
    minHeight: "calc(100vh - 210px)",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    gridTemplateRows: "auto auto auto auto",
    columnGap: "32px",
    rowGap: "16px",
    alignItems: "start",
    paddingTop: "0",
    boxSizing: "border-box",
  },

  hotIssueTitle: {
    gridColumn: 1,
    gridRow: 1,
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
  gridRow: 2,
  margin: "-8px 0 0",
  fontSize: "1.1rem",
  color: "#633d19",
  lineHeight: 1.6,
  maxWidth: "720px",
},

  issueButtons: {
    gridColumn: 2,
    gridRow: "1 / 3",
    alignSelf: "center",
    justifySelf: "end",
    display: "flex",
    flexDirection: "column",
    gap: "64px",
  },

  proposeBtn: {
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

  addEventBtn: {
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
    gridRow: 3,
    margin: "32px 0 0",
    fontSize: "3rem",
    fontWeight: 800,
    letterSpacing: "0.05em",
    color: "#553312",
    textTransform: "uppercase",
    lineHeight: 1,
  },

  timelineScroller: {
    gridColumn: "1 / -1",
    gridRow: 4,
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