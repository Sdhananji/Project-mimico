import { Link } from "react-router-dom";
import React from "react";
import backgroundImage from "../assets/background_homepage.jpg";
import '../styles/Home.css';

const Home = () =>{
    return (
        <div className = "home-container">
            <div className = "overlay">
                <h1 className = "welcome-note">Welcome to Mimico Easthetic Handmade Jewelry</h1>
                <div className = "content">
                    <div className="left">
                        <Link to="/login" className="btn">Login</Link>
                        <Link to="/register" className ="btn">Register</Link>
                    </div>
                    <div className ="right">
                        <p>
                            Discover unique, handcrafted jewelry pieces. Each item is carefully designed and made with love.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;