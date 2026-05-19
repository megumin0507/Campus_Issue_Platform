import { useState } from "react";
import type { CSSProperties } from "react";

type EventOption = {
  id: string;
  title: string;
};

type ProposeIssueModalProps = {
  open: boolean;
  onClose: () => void;
  events: EventOption[];
};

export default function ProposeIssueModal({
  open,
  onClose,
  events,
}: ProposeIssueModalProps) {
  const [issue, setIssue] = useState("");
  const [eventId, setEventId] = useState("");
  const [source, setSource] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ProposeIssue submit:", { issue, eventId, source });
    setIssue("");
    setEventId("");
    setSource("");
    onClose();
  };

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>+ Propose New Issue</h2>
          <button type="button" style={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.field}>
            <span style={styles.label}>Issue</span>
            <input
              type="text"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              style={styles.input}
              required
            />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Event</span>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              style={styles.input}
              required
            >
              <option value="" disabled>
                -- 選擇關聯 Event --
              </option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title}
                </option>
              ))}
            </select>
          </label>

          <label style={styles.field}>
            <span style={styles.label}>Source</span>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              style={styles.input}
              required
            />
          </label>

          <p style={styles.notice}>＊須審核</p>

          <div style={styles.actions}>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(17, 24, 39, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

  modal: {
    width: "min(520px, 92vw)",
    maxHeight: "90vh",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    border: "3px solid #111827",
    boxSizing: "border-box",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 18px",
    borderBottom: "3px solid #111827",
    backgroundColor: "#e5e7eb",
  },

  title: {
    margin: 0,
    fontSize: "22px",
  },

  closeButton: {
    border: "none",
    background: "transparent",
    fontSize: "28px",
    cursor: "pointer",
    lineHeight: 1,
  },

  form: {
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#111827",
  },

  input: {
    border: "2px solid #111827",
    padding: "8px 10px",
    fontSize: "14px",
    boxSizing: "border-box",
    fontFamily: "inherit",
    backgroundColor: "#ffffff",
  },

  notice: {
    margin: 0,
    color: "#dc2626",
    fontSize: "13px",
    fontWeight: 700,
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "4px",
  },

  cancelBtn: {
    border: "2px solid #111827",
    backgroundColor: "#ffffff",
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: 700,
  },

  submitBtn: {
    border: "2px solid #111827",
    backgroundColor: "#1A3A5C",
    color: "#ffffff",
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: 700,
  },
};
