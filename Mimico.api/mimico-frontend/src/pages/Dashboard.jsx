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

    if (!user){
        return <p style = {{color: "$fff", textAlign: "center"}}>Loading dashboard...</p>

    }

    return(
        <div className = "dashboard">
            <h1>Welcome, {user.fullName}✨</h1>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}

export default Dashboard;