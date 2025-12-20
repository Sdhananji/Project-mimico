import React from "react";
import "../styles/auth.css";
import {Link} from "react-router-dom";


function AuthForm({
    title,
    fields,
    buttonText,
    onSubmit,
    showFooter = false

}){
    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <h2>{title}</h2>

            {fields.map((field, index) =>(
                <div key={index} className="input-group">
                    {field.icon && <i className={field.icon}></i>}
                    <input
                        key = {index}
                        type = {field.type}
                        placeholder = {field.placeholder}
                        value = {field.value}
                        onChange = {field.onChange}
                        required
                />
                </div>
                
            ))}

            <button type = "submit">{buttonText}</button>

            {/* Added Registration Link */}
            {showFooter && (
                <div className = "auth-footer">
                    <p>
                        Have you not registered yet? <Link to= "/register">Click to register</Link>
                    </p>
                </div>
            )}
        </form>
    );
}

export default AuthForm;