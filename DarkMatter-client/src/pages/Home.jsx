import { useState } from "react";
import LogInForm from "../components/LogInForm"
import RegisterForm from "../components/Register"

const Home = () => {
    const [showLoginForm, setShowLoginForm] = useState(true)

    const toggleForm = () => {
        setShowLoginForm(!showLoginForm)
    }

    return (
        <div>
            {showLoginForm ? <LogInForm /> : <RegisterForm />}

            <button onClick={toggleForm}>
                {showLoginForm ? <p>Register here</p> : <p>Already have an account? Login here</p>}
            </button>
        </div>
    )
}

export default Home