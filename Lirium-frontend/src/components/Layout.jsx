import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <div className='wrapperNav'>
        <header>
          <h1 className='nav-h1'>Lirium-Protocol</h1>
          <nav>
            <ul className='nav-ul'>
              <li>
                <NavLink to={'/'}>Home</NavLink>
              </li>
              <li>
                <NavLink to={'/transactions'}>transactions</NavLink>
              </li>
              <li>
                <NavLink to={'/mine'}>Mine</NavLink>
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
