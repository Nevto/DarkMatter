import React, { useContext } from 'react';
import UserContext from '../useContext';

const LogoutButton = () => {
    const { logOutHandler } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await logOutHandler();
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button className="logoutButton" onClick={handleLogout}>
            Log Out
        </button>
    );
};

export default LogoutButton;
