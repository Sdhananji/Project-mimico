import {useState} from "react";
import {loginUser} from "../api/auth";
import {useNavigate} from "react-router-dom";
import AuthForm from "../components/AuthForm";
import "../styles/auth.css";

function Login(){
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await loginUser({email, password});
            localStorage.ssetItem("token", res.data.token);
            alert("Login Successful!")
            navigate("/dashboard");
        }catch{
            alert("Login Failed!");
        }
        
    };


    return (
        <div className="auth-page">
            <AuthForm 
                title = "Login"
                buttonText = "Login"
                onSubmit = {handleSubmit}
                fields={[
                    {
                        type: "email",
                        placeholder:"email",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                    },
                    {
                        type: "password",
                        placeholder:"Password",
                        value:password,
                        onChange: (e) => setPassword(e.target.value),
                    },
                ]}
            />
        </div>
    );
}

export default Login;