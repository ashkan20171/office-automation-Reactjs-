import LanguageSwitcher from "../common/LanguageSwitcher";
import "../../styles/layout/main-layout.css";


export default function MainLayout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <h1>SOA</h1>

        <LanguageSwitcher />
      </header>

      <aside className="sidebar">
        <ul>
          <li>Dashboard</li>
          <li>Letters</li>
          <li>Tasks</li>
        </ul>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
}
