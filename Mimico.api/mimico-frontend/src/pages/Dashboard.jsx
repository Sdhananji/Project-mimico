import {useEffect, useState} from "react";
import {getCurrentUser} from "../api/auth";
import {useNavigate} from "react-router-dom";

function Dashboard(){
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        getCurrentUser()
            .then(res =>{
                setUser(res.data);
            })
            .catch(()=>{
                //Token invalid / expired
                localStorage.removeItem("token");
                navigate("/login");
            });

    }, [navigate]);

    const handleLogout = () =>{
        localStorage.removeItem("token");
        navigate("/login");
    }

    if (!user){
        return <p className = "loading-text">Loading dashboard...</p>

    }

    return(
        <div className = "dashboard">
            <div className = "dashboard-header">
                <h1>Welcome, {user.fullName}✨</h1>
                <button className = "logout -btn" onClick = {handleLogout}>
                    Logout
                </button>
            </div>
            <div className = "dashboard-card">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role: </strong>{user.role}</p>
            </div>
           
        </div>
    );
}

export default Dashboard;