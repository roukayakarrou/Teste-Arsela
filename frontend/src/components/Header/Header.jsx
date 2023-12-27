import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const navigateTo = (to) => {
    navigate(to);
  };

  return (
    <div className="header">
        <h1 onClick={() => navigateTo("/")}>📝 Dynamic Form Generator</h1>
        <hr/>
    </div>
  )
}

export default Header;