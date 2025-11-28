import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "../../styles/pages/inbox.css";

export default function Inbox() {
  const { t } = useTranslation();

  const [letters, setLetters] = useState([]);

  useEffect(() => {
    // temporary test data (will connect to backend later)
    setLetters([
      {
        id: 1,
        subject: t("letter_subject_1"),
        sender: "HR Department",
        date: "2025-01-06",
        read: false,
        priority: "high"
      },
      {
        id: 2,
        subject: t("letter_subject_2"),
        sender: "IT Support",
        date: "2025-01-05",
        read: true,
        priority: "normal"
      },
      {
        id: 3,
        subject: t("letter_subject_3"),
        sender: "CEO Office",
        date: "2025-01-04",
        read: false,
        priority: "urgent"
      }
    ]);
  }, [t]);

  return (
    <div className="inbox-container">

      <h2 className="inbox-title">{t("letters")}</h2>

      <div className="inbox-list">

        {letters.map((item) => (
          <div className={`inbox-item ${item.read ? "read" : "unread"}`} key={item.id}>

            <div className={`inbox-priority ${item.priority}`}></div>

            <div className="inbox-content">
              <h3 className="inbox-subject">{item.subject}</h3>
              <p className="inbox-sender">{item.sender}</p>
            </div>

            <div className="inbox-date">
              {item.date}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
