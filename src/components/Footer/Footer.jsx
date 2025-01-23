import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div>Developed by Hanna Lee</div>
      <div>{new Date().getFullYear()}</div>
    </footer>
  );
}

export default Footer;
