import React, { useContext } from "react";
import $ from "jquery";
import { BiSolidUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/Auth-Context";
import NavbarContext from "../../Context/Navbar-Context";

const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);
  const { handleMobHam } = useContext(NavbarContext);
  const userDetails = JSON.parse(localStorage.getItem("token"));
  let navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.clear();
    sessionStorage.clear();
    logout();
    navigate("/");
  };

  const handleMenu = () => {
    $("#menu2").toggleClass("changebtn-2");
  };

  const handleHam = () => {
    $("aside").toggleClass("width");
    $("article").toggleClass("max-width");
    $(".nav").toggleClass("nav-width");
    $(".show-logo").toggleClass("d-block");
    $(".list-name").toggleClass("opacity");
  };

  return (
    <>
      <nav>
        <div className="uk-flex uk-flex-between  nav ">
          <div className="uk-flex uk-flex-middle">
            <div className="ham uk-visible@m" onClick={handleHam}>
              <div className="menu2" id="menu2" onClick={handleMenu}>
                <div>
                  <span className="bar-1"></span>
                  <span className="bar-2"></span>
                  <span className="bar-3"></span>
                </div>
              </div>
            </div>
            <div className="mob-ham uk-hidden@m" onClick={handleMobHam}>
              <div className="menu2">
                <div>
                  <span className="bar-1"></span>
                  <span className="bar-2"></span>
                  <span className="bar-3"></span>
                </div>
              </div>
            </div>
            <span className="show-logo">
              <Link to="/" className="btn btn-light">
                <span>Visit Site</span>
              </Link>
            </span>
          </div>

          <div className="uk-flex uk-flex-middle">
            <div onClick={handleLogout} className="btn btn-light">
              <span>Logout</span>
            </div>
            <span className="user-name">
              <BiSolidUser size="1rem" />
              {userDetails.Name.split(" ")[0]}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
