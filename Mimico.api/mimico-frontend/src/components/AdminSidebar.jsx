import { NavLink } from "react-router-dom";
import "../styles/adminSidebar.css";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2 className="brand">Mimico Admin</h2>

      <nav>
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/products/add">Add Product</NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
