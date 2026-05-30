import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children, currentPage, setCurrentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "var(--bg-primary)",
    }}>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <main style={{
        flex: 1,
        marginLeft: 220,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ flex: 1, padding: "28px", maxWidth: 1200 }}>
          {children}
        </div>
      </main>
    </div>
  );
}