import "../styles/adminTopbar.css";
import {useNavigate} from "react-router-dom";

function AdminTopbar() {

  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <header className="admin-topbar">
      <h3>Admin Panel</h3>
      <button className = "logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default AdminTopbar;
