import {useState}from "react";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../api/auth";
import AuthForm from "../components/AuthForm";
import "../styles/auth.css";

function Register(){

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await registerUser({
                fullName,
                email,
                password,
            });
            alert("User Registered Successfully!");
            navigate("/dashboard");
        }catch(error){
            console.error(error);
            alert("Registration Failed!");
        }
    };

    return (
        <div className= "auth-page">
            {/*Background slideshow*/}
            <div className = "slideshow">
                <div className="slideshow-image slideshow-image-1"></div>
                 <div className="slideshow-image slideshow-image-2"></div>
                <div className="slideshow-image slideshow-image-3"></div>
                <div className="slideshow-image slideshow-image-4"></div>
                <div className="slideshow-image slideshow-image-5"></div>
                <div className="slideshow-image slideshow-image-6"></div>
            </div>

            {/* Register Form */}
            <div className="auth-left">
                <p className = "welcome-script">Join</p>

                <h1 className = "brand-name">Mimico</h1>

                <div className = "poem italic-text">
                    <p>Join Mimico and explore handcrafted,</p>
                    <p>beach-inspired jewelry made with love and care.</p>
                    <p>Sign up to discover unique pieces</p>
                    <p>that capture the beauty of the ocean.</p>
                    
                </div>
            </div>
            <AuthForm 
                title="Register User"
                buttonText = "Register"
                onSubmit={handleSubmit}
                fields={[
                    {
                        type: "text",
                        placeholder: "Full Name",
                        icon: "fas fa-user",
                        value: fullName,
                        onChange: (e) => setFullName(e.target.value),

                    },
                    {
                        type: "email",
                        placeholder:"Email",
                        icon: "fas fa-envelope",
                        value: email,
                        onChange: (e) => setEmail(e.target.value),

                    },
                    {
                        type: "passsword",
                        placeholder: "Password",
                        icon: "fas fa-lock",
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                    }
                ]}
                />

        </div>
    )
}

export default Register;