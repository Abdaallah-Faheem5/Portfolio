import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="footer-inner">
        <span className="footer-logo">⟨ AF5 /⟩</span>
        <p className="footer-copy">
          © {year} Abdullah Faheem Amlih · Amman, Jordan
        </p>
        <p className="footer-sub">// Built with React + Vite</p>
      </div>
    </footer>
  );
}
