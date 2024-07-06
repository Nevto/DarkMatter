import { createContext, useState, useContext } from "react";
import { logIn, logout } from "./services/HttpClient"; // Adjust the import path as needed

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(null);

    const logInUser = (name) => {
        setIsLoggedIn(true);
        setUserName(name);
    };

    const logOut = async () => {
        try {
            await logout()
            setIsLoggedIn(false);
            setUserName(null);

            console.log('im logged out and tokens are cleared');
        } catch (error) {
            console.log('Error logging out', error);
        }
    };

    // const clearCookie = (cookieName) => {
    //     const cookiePath = '/';
    //     document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${cookiePath}; Secure;`;

    //     console.log(`Cookie '${cookieName}' cleared`);
    // };


    const logInAndUpdateUser = async (email, password, name) => {
        try {
            const user = await logIn(email, password);
            logInUser(name || email); // Use alias if provided, otherwise use name from backend
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, logIn: logInUser, logOut, userName, logInAndUpdateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
