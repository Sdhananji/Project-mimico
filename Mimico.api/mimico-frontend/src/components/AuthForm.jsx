import React from "react";
import "../styles/auth.css";


function AuthForm({
    title,
    fields,
    buttonText,
    onSubmit

}){
    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <h2>{title}</h2>

            {fields.map((field, index) =>(
                <input
                    key = {index}
                    type = {field.type}
                    placeholder = {field.placeholder}
                    value = {field.value}
                    onChange = {field.onChange}
                    required
                />
            ))}

            <button type = "submit">{buttonText}</button>
        </form>
    );
}

export default AuthForm;