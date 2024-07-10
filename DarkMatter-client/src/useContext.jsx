import { createContext, useState, useContext, useCallback } from "react";
import { logIn, logOut } from "./services/HttpClient"

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(null);

    const logInUser = (name) => {
        setIsLoggedIn(true);
        setUserName(name);
        console.log(`Logged in as ${name}`);
    };

    const logOutHandler = async () => {
        try {
            await logOut()
            console.log('Tokens are cleared, setting isLoggedIn to false')
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


    const logInAndUpdateUser = useCallback(async (email, password, name) => {
        try {
            await logIn(email, password)
            logInUser(name || email)
        } catch (error) {
            console.error("Login failed", error)
            setIsLoggedIn(false)
            throw error
        }
    }, [logInUser])

    return (
        <UserContext.Provider value={{ isLoggedIn, logIn: logInUser, logOutHandler, userName, logInAndUpdateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
