// import React from 'react';
// import { useUser } from "../useContext";
// import { logout } from '../services/HttpClient';

// export const Header = ({ onLoginClick }) => {
//     const { isLoggedIn, logOut, userName } = useUser();

//     const handleLoginClick = () => {
//         if (isLoggedIn) {
//             logOut();
//         } else {
//             onLoginClick();
//         }
//     };

//     return (
//         <header className='header'>
//             <h1>DarkMatter</h1>
//             {isLoggedIn && <span>Hey {userName}, you are logged in!</span>}
//             <button onClick={handleLoginClick}>
//                 {isLoggedIn ? 'Log Out' : 'Log In'}
//             </button>
//         </header>
//     );
// };
