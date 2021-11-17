import { Navlink } from 'react-router-dom';

function Header(props) {
  return (
    <header className="navbar">
      <div className="container flex justify-between item-center">
        <Navlink className="brand" href="/">
          <img alt="Brand Logo" src="/images/logo.svg" />
        </Navlink>
        <nav>
          <ul className="nav-menu flex item-center ">
            <li className="nav-item">
              <Navlink className="active" to="/">
                Home
              </Navlink>
            </li>
            <li className="nav-item">
              <Navlink to="/signup">Signup</Navlink>
            </li>
            <li className="nav-item">
              <Navlink to="/login">Login</Navlink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
