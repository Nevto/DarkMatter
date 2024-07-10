import { Outlet, NavLink } from 'react-router-dom';
import '../styles/main.css';

export const Layout = () => {
    return (
        <div className='wrapper'>
            <div className="headerWrapper">
                <header className='theWrapper'>
                    <figure className='logo'>
                        <img src={"./src/assets/DarkMatterLogo.png"} alt="Best logo in the world" />
                    </figure>
                    <h1 className='title'>DarkMatter</h1>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/" activeClassName="active">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/transaction" activeClassName="active">Transaction</NavLink>
                            </li>
                            <li>
                                <NavLink to="/register" activeClassName="active">Register</NavLink>
                            </li>
                            <li>
                                <NavLink to="/blocks" activeClassName="active">Blocks</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
