import React, { useState } from "react";
import $ from "jquery";
const NavbarContext = React.createContext();

export const NavbarContextProvider = (props) => {
  // const baseURL = "http://localhost:8009";
  const baseURL = process.env.REACT_APP_URL;

  const [userDetails, setUserDetails] = useState("");
  const handleMobHam = () => {
    $("aside").toggleClass("width");
    $("article").toggleClass("max-width");
    $(".nav").toggleClass("nav-width");
    $(".show-logo").toggleClass("d-block");
    $(".list-name").toggleClass("opacity");
  };

  return (
    <NavbarContext.Provider
      value={{
        userDetails,
        setUserDetails,
        baseURL,
        handleMobHam,
      }}
    >
      {props.children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext;
