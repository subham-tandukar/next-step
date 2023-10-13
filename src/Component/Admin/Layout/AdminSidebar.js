import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../Image/logo.png";
import { GrFormClose } from "react-icons/gr";
import { GiNotebook } from "react-icons/gi";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";
import UsewindowDimension from "../../Hook/UsewindowDimension";
import NavbarContext from "../../Context/Navbar-Context";

const AdminSidebar = () => {
  const { handleMobHam } = useContext(NavbarContext);
  const { width } = UsewindowDimension();
  const handleActive = () => {
    if (width < 960) {
      handleMobHam();
    }
  };

  return (
    <>
      <div className="brand">
        <img src={logo} alt="logo" />
        <span
          className="mob-close-icon uk-hidden@m mob-ham"
          uk-tooltip="Close"
          onClick={handleMobHam}
        >
          <GrFormClose size="1.5rem" />
        </span>
      </div>

      <ul className="uk-list uk-margin-remove-top ">
        <li>
          <NavLink
            to="/admin-dashboard"
            className="list non-active"
            onClick={handleActive}
          >
            <AiOutlineDashboard />
            <span className="list-name">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-category"
            className="list non-active"
            onClick={handleActive}
          >
            <BiCategory />
            <span className="list-name">Category</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-blog"
            className="list non-active"
            onClick={handleActive}
          >
            <MdOutlineSpeakerNotes />
            <span className="list-name">Blog</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-course"
            className="list non-active"
            onClick={handleActive}
          >
            <BsBook />
            <span className="list-name">Course</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-booking"
            className="list non-active"
            onClick={handleActive}
          >
            <GiNotebook />
            <span className="list-name">Booking</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default AdminSidebar;
