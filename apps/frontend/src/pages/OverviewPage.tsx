import { Link } from "react-router-dom";
import type { CSSProperties } from "react";

type IssueOverviewItem = {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
  summary?: string;
};

const issuesOverview: IssueOverviewItem[] = [
  {
    id: "issue-001",
    title: "台大校園突現便衣執法人員無預警抓人",
    startDate: "2025-08-07",
    endDate: null,
    summary:
      "便衣執法人員未事先通知校方即進入校園帶走學生，引發師生對校園自治與人身安全的高度關切。學生會要求校方說明事件經過、釐清執法程序是否合法，並研擬保障校園言論自由與集會權利的具體機制。",
  },
  {
    id: "issue-002",
    title: "對於興建學生宿舍而增長之長興街校門口交通流量",
    startDate: "2022-04-27",
    endDate: null,
    summary:
      "新建學生宿舍預計大幅增加長興街校門口的人車流量，居民與通勤學生擔憂交通安全與壅塞問題。討論聚焦於號誌調整、人行道拓寬與接駁規劃，期望在宿舍啟用前完成周邊交通配套。",
  },
  {
    id: "issue-003",
    title: "於2028年達成校園無車化",
    startDate: "2022-5-28",
    endDate: null,
    summary:
      "校方提出於2028年逐步限制機動車輛進入校園的願景，主張提升步行與單車環境以強化校園安全與永續。反對意見則關注身障人士通行、貨物運輸及緊急車輛動線等實際需求。",
  },
  {
    id: "issue-004",
    title: "分數膨脹因應對策",
    startDate: "2024-05-31",
    endDate: null,
    summary:
      "分數膨漲對內加劇分數競爭，影響修課規劃，對外也降低台大分數的信賴度，對此議題進行校內、與聯合校外討論",
  },
  {
    id: "issue-005",
    title: "Campus Space Usage Policy",
    startDate: "2025-12-22",
    endDate: null,
    summary:
      "A proposed revision to the campus space booking policy aims to balance student club access with departmental priorities. Key debates center on reservation limits, after-hours availability, and a transparent appeals process for rejected requests.",
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

        <h1 style={styles.title}>OVERVIEW</h1>

        <ul style={styles.list}>
          {issuesOverview.map((item, index) => {
            const isFeatured = index === 0;
            return (
              <li key={item.id} style={styles.listItem}>
                <Link
                  to={`/issues/${item.id}`}
                  style={{
                    ...styles.card,
                    ...(isFeatured ? styles.cardFeatured : null),
                  }}
                >
                  <div style={styles.cardHeader}>
                    <span
                      style={{
                        ...styles.issueTitle,
                        ...(isFeatured ? styles.issueTitleFeatured : null),
                      }}
                    >
                      {item.title}
                    </span>
                    <span style={styles.dateRange}>
                      {formatShortDate(item.startDate)} ～{" "}
                      {item.endDate ? formatShortDate(item.endDate) : "now"}
                    </span>
                  </div>

                  {item.summary ? (
                    <p
                      style={{
                        ...styles.summary,
                        ...(isFeatured ? styles.summaryFeatured : null),
                      }}
                    >
                      {item.summary}
                    </p>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/overview_background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    padding: "24px",
    fontFamily: "'Noto Serif TC', Arial, Helvetica, sans-serif",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  backLink: {
    display: "inline-block",
    marginBottom: "16px",
    color: "#331c06",
    textDecoration: "none",
    fontWeight: 700,
  },

  title: {
    margin: "0 0 32px",
    fontSize: "clamp(5rem, 12vw, 9rem)",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#331c06",
    lineHeight: 1,
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: "0 auto",
    width: "90%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  listItem: {
    display: "flex",
  },

  card: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.7)",
    border: "4px solid #633d19",
    borderRadius: "12px",
    padding: "20px 28px",
    textDecoration: "none",
  },

  cardFeatured: {
    padding: "28px 32px",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
  },

  issueTitle: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#553312",
  },

  issueTitleFeatured: {
    fontSize: "2.85rem",
    fontWeight: 800,
  },

  dateRange: {
    fontSize: "1.05rem",
    color: "#0967c8",
    whiteSpace: "nowrap",
  },

  summary: {
    margin: 0,
    fontSize: "1.1rem",
    color: "#633d19",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  summaryFeatured: {
    fontSize: "1.1rem",
    WebkitLineClamp: "unset" as unknown as number,
  },
};
