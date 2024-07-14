import React, { useContext } from 'react';
import UserContext from '../useContext';

export const LogoutButton = ({ preventFormSubmit }) => {
    const { logOut } = useContext(UserContext);

    const handleLogout = async (e) => {
        e.preventDefault();
        if (preventFormSubmit) preventFormSubmit()

        try {
            await logOut()
        } catch (error) {
            console.error('Error logging out:', error)
        }
    };

    return (
        <button className="loginButton" onClick={handleLogout}>
            Log Out
        </button>
    );
};

export default LogoutButton;
