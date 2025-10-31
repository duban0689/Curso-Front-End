import { NavLink, Outlet } from 'react-router-dom';

function Layout({ contextValue }) {

  return (
    <div className="dashboard-container">
      {}
      <nav className="sidebar">
        <h1 className="logo">Dashboard</h1>
        <ul className="nav-links">
          {}
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Inventario
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" className={({ isActive }) => (isActive ? 'active' : '')}>
              Añadir Producto
            </NavLink>
          </li>
        </ul>
      </nav>

      {}
      <main className="main-content">
        {}
        {}
        <Outlet context={contextValue} />
      </main>
    </div>
  );
}

export default Layout;