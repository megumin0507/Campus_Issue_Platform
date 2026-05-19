import { useState } from "react";
import type { CSSProperties } from "react";

type AddEventModalProps = {
  open: boolean;
  onClose: () => void;
};

const tagOptions = [
  "校園安全",
  "學生權益",
  "宿舍",
  "課程",
  "交通",
  "環境",
  "政策",
  "公聽會",
  "聲明",
  "其他",
];

export default function AddEventModal({ open, onClose }: AddEventModalProps) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!open) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("AddEvent submit:", { name, time, content, tags: selectedTags });
    setName("");
    setTime("");
    setContent("");
    setSelectedTags([]);
    onClose();
  };

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>+ Add Event</h2>
          <button type="button" style={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.field}>
            <span style={styles.label}>name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>time</span>
            <input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={styles.input}
              required
            />
          </label>

          <label style={styles.field}>
            <span style={styles.label}>內容</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              required
            />
          </label>

          <div style={styles.field}>
            <span style={styles.label}>tags</span>
            <div style={styles.tagScroller}>
              {tagOptions.map((tag) => {
                const checked = selectedTags.includes(tag);
                return (
                  <label
                    key={tag}
                    style={{
                      ...styles.tagChip,
                      backgroundColor: checked ? "#1A3A5C" : "#ffffff",
                      color: checked ? "#ffffff" : "#111827",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleTag(tag)}
                      style={styles.tagCheckbox}
                    />
                    {tag}
                  </label>
                );
              })}
            </div>
          </div>

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
    width: "min(560px, 92vw)",
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
  },

  textarea: {
    border: "2px solid #111827",
    padding: "8px 10px",
    fontSize: "14px",
    minHeight: "100px",
    boxSizing: "border-box",
    resize: "vertical",
    fontFamily: "inherit",
  },

  tagScroller: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    padding: "4px 2px 8px",
  },

  tagChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    flex: "0 0 auto",
    border: "1.5px solid #111827",
    padding: "6px 12px",
    fontSize: "13px",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
  },

  tagCheckbox: {
    margin: 0,
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
