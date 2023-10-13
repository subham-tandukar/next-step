import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { useLocation, useParams } from "react-router-dom";
import { Fetchdata } from "../Hook/getData";
import NavbarContext from "../Context/Navbar-Context";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../Toast";

const BookingForm = () => {
  const { baseURL } = useContext(NavbarContext);
  //   to get course id
  const { id } = useParams();

  //   to get course name
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const course = searchParams.get("course");
  const price = searchParams.get("price");

  const initialValue = {
    courseName: course,
    price: parseInt(price) / 100,
    fullname: "",
    email: "",
    number: "",
    address: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formValue.fullname ||
      !formValue.email ||
      !formValue.number ||
      !formValue.address
    ) {
      setIsSubmit(false);
      toast.error("Please fill all the fields", {
        theme: "light",
      });
    } else {
      setIsSubmit(true);
      const payload = {
        return_url: "http://localhost:3000/success",
        website_url: "http://localhost:3000/",
        amount: parseInt(price),
        purchase_order_id: id,
        purchase_order_name: course,
        customer_info: {
          name: formValue.fullname,
          email: formValue.email,
          phone: formValue.number,
        },
      };

      const res = await axios.post(`${baseURL}/api/khaltiPayment`, payload);
      console.log("res", res);
      if (res && res?.data?.data?.payment_url) {
        window.location.href = `${res?.data?.data?.payment_url}`;
        booking();
      }
    }
  };

  const booking = () => {
    const dataForm = {
      Course: course,
      Fullname: formValue.fullname,
      Email: formValue.email,
      PhoneNumber: formValue.number,
      Address: formValue.address,
    };
    localStorage.setItem("booking", JSON.stringify(dataForm));
  };

  return (
    <>
      {isSubmit && (
        <div class="pre-loader">
          <div class="loading">
            <div class="loader-icon"></div>
            <span>Please wait...</span>
          </div>
        </div>
      )}
      <Toast />
      <div className="booking__form default__header">
        <Navbar />

        <section className="uk-margin-large-top section">
          <div className="uk-container uk-container-small">
            <div className="title-wrapper">
              <h2>
                Booking seat for: <span>{course}</span>
              </h2>
            </div>

            <div className="content__wrapper">
              <form action="">
                <div className="uk-grid uk-child-width-1-2@m" data-uk-grid>
                  <div className="form-wrapper">
                    <label htmlFor="courseName">
                      Course Name<sup className="sup-col">*</sup>
                    </label>
                    <input
                      type="text"
                      className="uk-input"
                      name="courseName"
                      id="courseName"
                      disabled
                      readOnly
                      value={course}
                    />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="price">
                      Price<sup className="sup-col">*</sup>
                    </label>
                    <input
                      type="text"
                      className="uk-input"
                      name="price"
                      id="price"
                      disabled
                      readOnly
                      value={formValue.price}
                    />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="fullname">
                      Fullname<sup className="sup-col">*</sup>
                    </label>
                    <input
                      type="text"
                      className="uk-input"
                      name="fullname"
                      id="fullname"
                      required
                      onChange={handleChange}
                      value={formValue.fullname}
                    />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="email">
                      Email<sup className="sup-col">*</sup>
                    </label>
                    <input
                      type="email"
                      className="uk-input"
                      name="email"
                      id="email"
                      required
                      onChange={handleChange}
                      value={formValue.email}
                    />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="number">
                      Phone Number<sup className="sup-col">*</sup>
                    </label>
                    <input
                      type="number"
                      className="uk-input"
                      name="number"
                      id="number"
                      required
                      onChange={handleChange}
                      value={formValue.number}
                    />
                  </div>
                  <div className="form-wrapper">
                    <label htmlFor="address">
                      Address<sup className="sup-col">*</sup>
                    </label>
                    <input
                      type="text"
                      className="uk-input"
                      name="address"
                      id="address"
                      required
                      onChange={handleChange}
                      value={formValue.address}
                    />
                  </div>
                </div>
                <button className="btn mt-30" onClick={handleSubmit}>
                  <span>Pay through Khalti</span>
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BookingForm;
