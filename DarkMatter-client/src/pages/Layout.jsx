import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export const Layout = () => {
    return (
        <div className='wrapper'>
            <div className="headerWrapper">
                <header>
                    <figure className='logo'>
                        <img src={"./src/assets/DarkMatterLogo.png"} alt="Best logo in the world" />
                    </figure>

                    <h1 className='title'>The Napoli Oven</h1>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <NavLink to="/">DarkMatter</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/transaction">Transaction</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/blocks">Blocks</NavLink>
                                </li>
                            </ul>
                        </nav>
                        <Outlet />
                    </div>
                </header>
            </div>
            <footer>
                <div className="Footer">
                    <p className="copyRight">© 2024 DarkMatter</p>
                    <p className="allRights">All rights reserved</p>
                    <div className="openingHours">
                        <h3>Blockchain Matters</h3>

                    </div>
                </div>

            </footer >
        </div >
    )
}
