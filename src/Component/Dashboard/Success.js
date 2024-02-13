import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import NavbarContext from "../Context/Navbar-Context";
import { Fetchdata } from "../Hook/getData";
import CourseContext from "../Context/courseContextFolder/courseContext";

const Success = ({ course }) => {
  // const { baseURL } = useContext(NavbarContext);
  // const { courseLst } = useContext(CourseContext);
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const isSuccess = searchParams.get("status");
  // const courseName = searchParams.get("purchase_order_name");
  // const courseId = searchParams.get("purchase_order_id");

  // const bookingData = JSON.parse(localStorage.getItem("booking"));
  // const [isEditSubmit, setIsEditSubmit] = useState(false);
  // const [isEditSubmit, setIsEditSubmit] = useState(true);

  const isSuccess = "Completed";

  //   to check whether payment is successfully done or not
  // useEffect(() => {
  //   if (isSuccess === "Completed") {
  //     setIsEditSubmit(true);
  //   }
  // }, []);

  // call this function when the payment is successfully done
  // useEffect(() => {
  //   if (isSubmit) {
  //     booking();
  //   }
  // }, []);
  // useEffect(() => {
  //   if (isEditSubmit) {
  //     editData();
  //     booking();
  //   }
  // }, [isEditSubmit]);



 

  return (
    <div className="timeoutBg">
      <div className="timeoutPop">
        <div className="timeoutPop-body text-center">
          <h5>
            {isSuccess === "Completed"
              ? "Booking Successful ✅"
              : "Booking Failed ❎"}
          </h5>
          <p>
            {isSuccess === "Completed"
              ? `Thank you for booking the ${course} course. We will contact you soon via email or contact number.`
              : "Try again later"}
          </p>
        </div>

        <div className="timeoutPop-footer">
          <Link className="btn" to="/">
            <span>OK</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
