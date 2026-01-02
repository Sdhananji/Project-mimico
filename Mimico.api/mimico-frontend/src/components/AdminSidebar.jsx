import { NavLink } from "react-router-dom";
import "../styles/adminSidebar.css";

function AdminSidebar() {
  //const navigate = useNavigate();
  
  return (
    <aside className="admin-sidebar">
      <h2 className="brand">Ishuku ....</h2>

      <nav>
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/products/add">Add Product</NavLink>
        <NavLink to= "/admin/products/orders">Orders</NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
