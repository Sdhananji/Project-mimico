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
            localStorage.setItem("token", res.data.token);
            alert("Login Successful!")
            navigate("/dashboard");
        }catch{
            alert("Login Failed!");
        }
        
    };


    return (
        <div className="auth-page">

            <div className = "slideshow">
                <div className="slideshow-image slideshow-image-1"></div>
                <div className="slideshow-image slideshow-image-2"></div>
                <div className="slideshow-image slideshow-image-3"></div>
                <div className="slideshow-image slideshow-image-4"></div>
                <div className="slideshow-image slideshow-image-5"></div>
                <div className="slideshow-image slideshow-image-6"></div>
            </div>

            {/*Left side  content */}
            <div className="auth-left">
                <p className="welcome-script">Welcome Back to</p>

                <h1 className="brand-name">Mimico</h1>

                <div className="poem italic-text">
                    <p>Inspired by the ocean.</p>
                    <p>Crafted by hand.</p>
                    <p>Made for you.</p>
                </div>

                <p className="description">
                    Log in to discover beach-vibe jewelry that tells a story.
                </p>
            </div>


            {/*Right lofin form */}
            <AuthForm 
                title = "Login User"
                buttonText = "Login"
                onSubmit = {handleSubmit}
                showFooter = {true}
                fields={[
                    {
                        type: "email",
                        placeholder:"email",
                        icon: "fas fa-envelope",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                    },
                    {
                        type: "password",
                        placeholder:"Password",
                        icon: "fas fa-lock",
                        value:password,
                        onChange: (e) => setPassword(e.target.value),
                    },
                ]}
            />
        </div>
    );
}

export default Login;