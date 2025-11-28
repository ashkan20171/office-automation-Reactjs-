import { useTranslation } from "react-i18next";
import { useState } from "react";
import "../../styles/pages/compose.css";

export default function Compose() {
  const { t } = useTranslation();

  const [subject, setSubject] = useState("");
  const [to, setTo] = useState("");
  const [priority, setPriority] = useState("normal");
  const [labels, setLabels] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [content, setContent] = useState("");

  const handleAttach = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const toggleLabel = (label) => {
    if (labels.includes(label)) {
      setLabels(labels.filter((l) => l !== label));
    } else {
      setLabels([...labels, label]);
    }
  };

  return (
    <div className="compose-container">

      <h2 className="compose-title">{t("compose_letter")}</h2>

      {/* SUBJECT */}
      <div className="compose-group">
        <label>{t("subject")}</label>
        <input
          type="text"
          className="compose-input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* RECIPIENT */}
      <div className="compose-group">
        <label>{t("recipient")}</label>
        <input
          type="text"
          className="compose-input"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="user@company.com"
        />
      </div>

      {/* PRIORITY */}
      <div className="compose-group">
        <label>{t("priority")}</label>

        <div className="priority-box">
          <button
            className={priority === "normal" ? "active" : ""}
            onClick={() => setPriority("normal")}
          >
            {t("normal")}
          </button>

          <button
            className={priority === "high" ? "active" : ""}
            onClick={() => setPriority("high")}
          >
            {t("high")}
          </button>

          <button
            className={priority === "urgent" ? "active" : ""}
            onClick={() => setPriority("urgent")}
          >
            {t("urgent")}
          </button>
        </div>
      </div>

      {/* LABELS */}
      <div className="compose-group">
        <label>{t("labels")}</label>

        <div className="labels-box">
          {["HR", "Management", "Follow-Up", "Confidential"].map((label) => (
            <span
              key={label}
              className={`label-item ${labels.includes(label) ? "active" : ""}`}
              onClick={() => toggleLabel(label)}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ATTACHMENTS */}
      <div className="compose-group">
        <label>{t("attachments")}</label>

        <input type="file" multiple onChange={handleAttach} />

        <div className="attachment-list">
          {attachments.map((file, index) => (
            <div key={index} className="attachment-item">
              {file.name}
            </div>
          ))}
        </div>
      </div>

      {/* RICH TEXT EDITOR */}
      <div className="compose-group">
        <label>{t("body")}</label>

        <div className="editor-toolbar">
          <button onClick={() => document.execCommand("bold")}>B</button>
          <button onClick={() => document.execCommand("italic")}>I</button>
          <button onClick={() => document.execCommand("underline")}>U</button>
          <button onClick={() => document.execCommand("insertUnorderedList")}>•</button>
          <button onClick={() => document.execCommand("insertOrderedList")}>1.</button>
          <button onClick={() => document.execCommand("justifyLeft")}>{t("left")}</button>
          <button onClick={() => document.execCommand("justifyCenter")}>{t("center")}</button>
          <button onClick={() => document.execCommand("justifyRight")}>{t("right")}</button>
        </div>

        <div
          className="editor-box"
          contentEditable="true"
          onInput={(e) => setContent(e.target.innerHTML)}
        ></div>
      </div>

      {/* BUTTONS */}
      <div className="compose-actions">
        <button className="draft-btn">{t("save_draft")}</button>
        <button className="send-btn">{t("send")}</button>
      </div>

    </div>
  );
}
