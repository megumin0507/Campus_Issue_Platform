import { Link, useParams } from "react-router-dom";
import type { CSSProperties } from "react";
import CommentsSection from "../components/CommentsSection";

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
    title: "對於增建學生宿舍而增加長興街校門口交通流量之對策",
    aiSummary:
      "對於因應117年新增3,000床學生宿舍所帶來的行人與自行車流量，同時改善尖峰時段人車爭道與動線交織問題",
    timeline: [
      {
        id: "timeline-003",
        date: "2022-11-11",
        title: "邀集校內相關單位 學府里及工務局 交通觸及台北市自來水事業處等單位會勘",
        description:
          "未來舟山路底開口採經與會單位原則同意，以老師使用方便及安全管理為原則。",
      },
      {
        id: "timeline-004",
        date: "2023-03-14",
        title: "短期工程－機車破口：舟山路底（基隆路三段30巷）開闢機車出入口工程規劃設計",
        description:
          "A112年03月14日~113年2月5日進行「舟山路底(基隆路三段30巷)開闢機車出入口工程」規劃設計至工程完工。",
      },
      {
        id: "timeline-05",
        date: "2026-04-08",
        title: "明達館側戶外環境改善工程基本設計",
        description:
          "長興街為校園內重要之東側通學動線與交通節點，設計出最完善動線其中包含一．自行車道拓寬 二．動線調整及部分圍牆拆除 三．明達館機車停車格及中庭景觀 四．舟山路自行車穿線規劃及路緣線型調整。",
      },
      
    ],
    relatedEvents: [
      {
        id: "event-005",
        title: "校發會110學年度第5次會議：未來機車將不由長興街進出校園",
      },
      {
        id: "event-007",
        title: "短期工程－機車破口：舟山路底（基隆路三段30巷）開闢機車出入口工程規劃設計",
      },
      {
        id: "event-008",
        title: "長興街校門口拓寬工程",
      },
    ],
    comments: [],
  },
  {
    id: "issue-003",
    title: "於2028年達成校園無車化",
    aiSummary:
      "本計畫擬針對本校（校總區基隆路以北區域）校園無車化之進程規劃：除送貨車、救護車、計程車等特定服務性車輛和幼兒園家長接送車輛得以進入校園，循規劃之路線至餐廳、實驗室、幼兒園等場館，其他車輛皆須停放於外圍停車場，不進入校園。",
    timeline: [
      {
        id: "timeline-004",
        date: "2022-05-28",
        title: "110學年度第二學期第二次校務會議",
        description:
          "學生會張承語同學提案，盡速於111年8月起，開始校園無汽車之時程擬訂，最晚須於2032年前，達成校園內非服務性機動汽車之校園規劃目標",
      },
      {
        id: "timeline-005",
        date: "2024-11-29",
        title: "校總區無車化執行方案與推動時程整體規劃全校公聽會",
        description:
          "於公聽會搜集各方意見與討論國外執行案例，包含校園車速、動線地下化、同時必須確保身心障礙者交通方便性。",
      },
    ],
    relatedEvents: [
      {
        id: "event-003",
        title: "校總區無車化執行方案與推動時程整體規劃全校公聽會",
      },
    ],
    comments: [],
  },
  {
    id: "issue-004",
    title: "分數膨脹因應方案",
    aiSummary:
      "分數膨脹議題對內不僅加劇分數競爭、不利彰顯卓越，對外也使得分數貶值，降低國外大學對台大分數的信賴度，為因應提出七項措施與長期目標",
    timeline: [
      {
        id: "timeline-006",
        date: "2024-05-31",
        title: "112學年度第二學期第二次教務會議",
        description:
          "於此會議討論分數膨脹現象，提出他校參考策略與台大可能應對方法",
      },
      {
        id: "timeline-007",
        date: "2025-03-31",
        title: "全校師生座談會",
        description:
          "於此會議回應學生會問卷調查結果，提出處理此議題的必要性。",
      },
    ],
    relatedEvents: [
      {
        id: "event-010",
        title: "112學年度第二學期第二次教務會議",
      },
      {
        id: "event-011",
        title: "分數膨脹因應方案-學生座談會",
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

        <CommentsSection threadId={issue.id} />
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
    backgroundImage: "url('/background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    padding: "24px",
    fontFamily: "'Noto Serif TC', Arial, Helvetica, sans-serif",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  backLink: {
    display: "inline-block",
    marginBottom: "16px",
    color: "#553312",
    textDecoration: "none",
    fontWeight: 700,
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    border: "2px solid #633d19",
    borderRadius: "12px",
    padding: "24px 28px",
    marginBottom: "16px",
    boxSizing: "border-box",
  },

  label: {
    margin: "0 0 8px",
    color: "#7a5d41",
    fontWeight: 700,
    textTransform: "uppercase",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    color: "#553312",
  },

  sectionTitle: {
    margin: "0 0 12px",
    fontSize: "22px",
    color: "#7a5d41",
  },

  paragraph: {
    margin: 0,
    fontSize: "16px",
    lineHeight: 1.6,
    color: "#633d19",
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
    border: "2px solid #633d19",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "12px",
    padding: "14px",
  },

  timelineDate: {
    fontWeight: 700,
    color: "#553312",
  },

  timelineContent: {
    borderLeft: "2px solid #633d19",
    paddingLeft: "14px",
  },

  timelineTitle: {
    margin: "0 0 8px",
    fontSize: "18px",
    color: "#553312",
  },

  relatedEventList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  linkBox: {
    display: "block",
    border: "2px solid #633d19",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "12px",
    padding: "14px",
    color: "#553312",
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
    border: "2px solid #633d19",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "12px",
    padding: "12px",
    color: "#553312",
  },

  commentText: {
    margin: "6px 0 0",
    color: "#633d19",
  },

  mutedText: {
    color: "#7a5d41",
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

  replyList: {
    marginLeft: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "4px",
  },

  replyItem: {
    border: "1.5px solid #b08060",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: "10px",
    padding: "10px 12px",
    color: "#553312",
  },

  replyEditor: {
    marginLeft: "32px",
    marginTop: "8px",
    marginBottom: "8px",
  },

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