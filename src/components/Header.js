import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <header className="navbar">
      <div className="container flex justify-between item-center">
        <NavLink className="brand" to="/">
          <img alt="Brand Logo" src="/images/logo.svg" />
        </NavLink>
        <nav>{props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}</nav>
      </div>
    </header>
  );
}

function NonAuthHeader() {
  return (
    <ul className="nav-menu flex item-center ">
      <li className="nav-item">
        <NavLink activeClassName="active" to="/" exact>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" to="/signup">
          Signup
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );
}

function AuthHeader() {
  return (
    <ul className="nav-menu flex item-center ">
      <li className="nav-item">
        <NavLink activeClassName="active" to="/" exact>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" to="/signup">
          New Article
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" to="/login">
          Profile
        </NavLink>
      </li>
    </ul>
  );
}

export default Header;
