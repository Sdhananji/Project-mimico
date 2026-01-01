import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AddProduct from "./pages/admin/AddProduct";
import AdminHome from "./pages/admin/AdminHome";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/dashboard" element = {
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
        } 
        />

        {/* Admin only dashboard */}
        <Route 
          path = "/admin"
          element = {
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="products/add" element={<AddProduct />} />
        </Route>
        
        {/* Unauthorized access */}
        <Route path = "/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;