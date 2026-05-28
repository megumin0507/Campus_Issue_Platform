import { Link } from "react-router-dom";
import type { CSSProperties } from "react";

type IssueOverviewItem = {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
};

const issuesOverview: IssueOverviewItem[] = [
  {
    id: "issue-001",
    title: "台大校園突現便衣執法人員無預警抓人",
    startDate: "2025-08-07",
    endDate: null,
  },
  {
    id: "issue-002",
    title: "對於興建學生宿舍而增長之長興街校門口交通流量",
    startDate: "2022-04-27",
    endDate: null,
  },
  {
    id: "issue-003",
    title: "於2028年達成校園無車化",
    startDate: "2022-5-28",
    endDate: null,
  },
  {
    id: "issue-004",
    title: "Course Selection System Feedback",
    startDate: "2025-12-20",
    endDate: "2026-01-15",
  },
  {
    id: "issue-005",
    title: "Campus Space Usage Policy",
    startDate: "2025-12-22",
    endDate: null,
  },
];

function formatShortDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const yy = String(d.getFullYear()).slice(-2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
}

export default function OverviewPage() {
  return (
    <main style={styles.page}>
      <section style={styles.container}>
        <Link to="/" style={styles.backLink}>
          ← Back to Home
        </Link>

        <h1 style={styles.title}>Overview</h1>

        <ul style={styles.list}>
          {issuesOverview.map((item) => (
            <li key={item.id} style={styles.listItem}>
              <Link to={`/issues/${item.id}`} style={styles.row}>
                <span style={styles.issueTitle}>{item.title}</span>
                <span style={styles.dateRange}>
                  {formatShortDate(item.startDate)} ～{" "}
                  {item.endDate ? formatShortDate(item.endDate) : "now"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
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

  title: {
    margin: "0 0 20px",
    fontSize: "36px",
    letterSpacing: "4px",
    borderBottom: "3px solid #111827",
    paddingBottom: "8px",
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  listItem: {
    border: "2px solid #111827",
    backgroundColor: "#ffffff",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    padding: "16px 18px",
    textDecoration: "none",
    color: "#111827",
  },

  issueTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#111827",
  },

  dateRange: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#2563eb",
    whiteSpace: "nowrap",
  },
};
