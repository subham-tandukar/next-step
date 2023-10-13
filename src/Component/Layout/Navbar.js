import React, { useContext } from "react";
import logo from "../../Image/logo.png";
import { Link } from "react-router-dom";
import AuthContext from "../Context/Auth-Context";

const Navbar = () => {
  const { UserDATA } = useContext(AuthContext);

  return (
    <nav
      className="site-nav"
      data-uk-sticky="start: 300; animation: uk-animation-slide-top"
    >
      {UserDATA && (
        <div className="go-to-dashboard">
          <Link to="/admin-dashboard">Go to Dashboard</Link>
        </div>
      )}
      <div className="uk-container">
        <div className="my-nav uk-flex uk-flex-middle uk-flex-between">
          <div>
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          </div>

          <div>
            <div className="nav-items">
              <ul>
                <li>
                  <Link to="/">home</Link>
                  <a href="#service">services</a>
                  <a href="#course">courses</a>
                  <a href="#blog">blog</a>
                  <a href="#contact">contact us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
