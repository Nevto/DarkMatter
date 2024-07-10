import { useState } from "react";
import LogInForm from "../components/LogInForm"
import RegisterForm from "../components/Register"

const Home = () => {
    const [showLoginForm, setShowLoginForm] = useState(true)

    const toggleForm = () => {
        setShowLoginForm(!showLoginForm)
    }

    return (
        <div className="registerForm">
            <span className="regText">
                <h2>You are not a member yet?</h2>
                <h3>Log in or sign up below to take part of everything DarkMatter has to offer</h3>
            </span>
            {showLoginForm ? <LogInForm /> : <RegisterForm />}
            <div className="arrow-down"></div>
            <button className="registerButton" onClick={toggleForm}>
                {showLoginForm ? "Register here" : <p>Already have an account? Login here</p>}
            </button>
        </div>
    )
}

export default Home