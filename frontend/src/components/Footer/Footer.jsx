import "./Footer.css";

function Footer() {
  const myGithubUrl = "https://github.com/roukayakarrou";

  return (
    <div className="footer">
      <p>Made with ❤️ by <a href={myGithubUrl} target="_blank">Roukaya Karrou</a></p>
    </div>
  );
}

export default Footer;