import { useContext, useEffect, useState } from "react";
import UserContext from "../useContext";
import { logOut } from "../services/HttpClient";
import LogoutButton from "./LogoutButton";

const LogInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { logInAndUpdateUser, isLoggedIn, logOut } = useContext(UserContext);
    const [loggedInName, setLoggedInName] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logInAndUpdateUser(email, password, name);
            const loggedInName = name || email.split('@')[0];
            setLoggedInName(loggedInName);
            console.log('You are now logged in as', name || email);
        } catch (error) {
            console.log('Couldn\'t log in', error);
            setError('Couldn\'t log in, please try again');
            setLoggedInName(null);
        }
    };

    useEffect(() => {
        console.log('isLoggedIn state changed:', isLoggedIn);
        if (!isLoggedIn) {
            setLoggedInName(null);
        }
    }, [isLoggedIn]);


    // const handleLogout = async () => {
    //     try {
    //         await logOut();
    //         setLoggedInName(null);
    //         console.log('Logged out successfully');
    //     } catch (error) {
    //         console.error('Error logging out', error);
    //     }
    // };

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
            />
            {!isLoggedIn && <button className="loginButton" type="submit">Log In</button>}
            {isLoggedIn &&
                <LogoutButton preventFormSubmit={() => console.log('it works')} />}


            {loggedInName && (
                <div className="loggedInMessage">
                    <p>Hello {loggedInName}, you are now logged in!</p>
                    <p>You may now send transactions, mine some blocks and explore the entirety of DarkMatter.</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default LogInForm;
