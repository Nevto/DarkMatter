import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className='wrapper-nav'>
        <header>
          <h2 className='nav-h2'>Lirium-Protocol</h2>
          <nav>
            <ul className='nav-ul'>
              <li>
                <NavLink to={'/'}>Home</NavLink>
              </li>
              <li>
                <NavLink to={'/transactions'}>transactions</NavLink>
              </li>
              <li>
                <NavLink to={'/sendtransaction'}>Send</NavLink>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
