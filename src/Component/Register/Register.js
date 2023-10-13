import React from "react";
import img from "../../Image/pluto.jpeg";
import "../../Css/Register.css";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Toast from "../Toast";
import { Fetchdata } from "../Hook/getData";
import NavbarContext from "../Context/Navbar-Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { baseURL } = useContext(NavbarContext);

  const initialvalue = { name: "", email: "", password: "" };
  const [inputData, setInputData] = useState(initialvalue);
  const [isSubmit, setIsSubmit] = useState(false);
  let navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmit(true);
  };
  useEffect(() => {
    if (isSubmit) {
      const dataForm = {
        Name: inputData.name,
        Email: inputData.email,
        Password: inputData.password,
        FLAG: "I",
        FetchURL: `${baseURL}/api/user`,
        Type: "POST",
      };

      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            toast.success("Registered sucessful", {
              theme: "light",
            });
            setTimeout(() => {
              setIsSubmit(false);
              navigate("/login");
            }, 3000);
          } else {
            toast.error(result.Message, {
              theme: "light",
            });
            setIsSubmit(false);
          }
        })
        .catch((result) => {
          setIsSubmit(false);
        });
    } else {
      setIsSubmit(false);
    }
  }, [isSubmit]);

  return (
    <>
      <Toast />
      <div className="register-form">
        <div className="wrapper uk-container">
          <div className="uk-grid uk-child-width-1-2@m" data-uk-grid>
            <div>
              <div className="register-img">
                <img src={img} alt="" />
              </div>
            </div>
            <div>
              <div className="form__content">
                <span className="sub__title">Hello !</span>
                <h3 className="mb-3 heading__title">
                  Welcome to Register Page
                </h3>

                <form className="register-body uk-margin-top">
                  <div className="form-wrapper">
                    <label htmlFor="name"> Name</label>
                    <input
                      type="text"
                      className="uk-input"
                      name="name"
                      id="name"
                      onChange={handleChange}
                      value={inputData.name}
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div className="form-wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="uk-input"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      value={inputData.email}
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div className="form-wrapper">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      className="uk-input"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      value={inputData.password}
                      autoComplete="off"
                      required
                    />
                  </div>

                  <p>
                    Already have an account?
                    <Link to="/login">Login</Link>
                  </p>
                  <button className="btn" onClick={handleSubmit}>
                    {isSubmit ? (
                      <span>Please wait..</span>
                    ) : (
                      <span>Register</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
