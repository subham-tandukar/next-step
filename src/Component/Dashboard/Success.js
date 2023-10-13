import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import NavbarContext from "../Context/Navbar-Context";
import { Fetchdata } from "../Hook/getData";
import CourseContext from "../Context/courseContextFolder/courseContext";

const Success = () => {
  const { baseURL } = useContext(NavbarContext);
  const { courseLst } = useContext(CourseContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSuccess = searchParams.get("status");
  const courseName = searchParams.get("purchase_order_name");
  const courseId = searchParams.get("purchase_order_id");

  const bookingData = JSON.parse(localStorage.getItem("booking"));
  const [isEditSubmit, setIsEditSubmit] = useState(false);

  //   to check whether payment is successfully done or not
  useEffect(() => {
    if (isSuccess === "Completed") {
      setIsEditSubmit(true);
    }
  }, []);

  // call this function when the payment is successfully done
  useEffect(() => {
    if (isEditSubmit) {
      editData();
      booking();
    }
  }, [isEditSubmit]);

  // if payment is done successfully,
  // deduct the no of seat for particular course by 1
  const editData = () => {
    const dataForm = {
      FLAG: "BOOKED",
      CourseID: courseId,
      FetchURL: `${baseURL}/api/course`,
      Type: "POST",
    };
    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          courseLst();
        } else {
        }
      })
      .catch((result) => {});
  };

  // to set the data of user who booked the course
  const booking = () => {
    const dataForm = {
      FLAG: "I",
      Course: bookingData.Course,
      Fullname: bookingData.Fullname,
      Email: bookingData.Email,
      PhoneNumber: bookingData.PhoneNumber,
      Address: bookingData.Address,
      IsPaid: true,
      FetchURL: `${baseURL}/api/booking`,
      Type: "POST",
    };
    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
        } else {
        }
      })
      .catch((result) => {});
  };

  return (
    <div className="timeoutBg">
      <div className="timeoutPop">
        <div className="timeoutPop-body text-center">
          <h5>
            {isSuccess === "Completed"
              ? "Payment Successful ✅"
              : "Payment Failed ❎"}
          </h5>
          <p>
            {isSuccess === "Completed"
              ? `Thank you for booking the ${courseName} course. We will contact you soon via email or contact number.`
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
