import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import "../styles/adminLayout.css";

function AdminDashboard() {
  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main">
        <AdminTopbar />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
