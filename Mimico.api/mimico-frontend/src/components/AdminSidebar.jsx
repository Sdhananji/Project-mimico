import { NavLink , useNavigate} from "react-router-dom";
import "../styles/adminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();
  
  return (
    <aside className="admin-sidebar">
      <h2 className="brand">Ishuku ....</h2>

      <nav>
        <NavLink to="/admin">
          <i className="fas fa-chart-line"></i>  Dashboard
        </NavLink>

        <p className = "section-title">Products</p>
        <NavLink to = "/admin/products">
          <i className="fas fa-box"></i>All Products
        </NavLink>
        <NavLink to = "/admin/products/add">
          <i className="fas fa-plus-circle"></i>  Add Product
        </NavLink>

        <p className = "section-title">Management</p>
        <NavLink to = "/admin/categories">
          <i className = "fas fa-tags"></i>Categories
        </NavLink>
        <NavLink to = "/admin/orders">
          <i className = "fas fa-receipt"></i>Orders
        </NavLink>
        <NavLink to = "/admin/users">
          <i className = "fas fa-users"></i>Customers
        </NavLink>

        <p className = "section-title">Others</p>
        <NavLink to = "/admin/settings">
          <i className = "fas fa-cog"></i>Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
