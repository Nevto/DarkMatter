import { useContext, useState } from "react";
import UserContext from "../useContext";

const LogInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { logInAndUpdateUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logInAndUpdateUser(email, password, name);
            console.log('You are now logged in as', name || email);
        } catch (error) {
            console.log('Couldn\'t log in', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
            // required
            />
            <button className="loginButton" type="submit">Log In</button>
        </form>
    );
};

export default LogInForm;
