import React from "react";
import img from "../../Image/halo.jpg";
import "../../Css/Login.css";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Toast from "../Toast";
import { Fetchdata } from "../Hook/getData";
import NavbarContext from "../Context/Navbar-Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../Context/Auth-Context";

const Login = () => {
  const { login } = useContext(AuthContext);
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
        Email: inputData.email,
        Password: inputData.password,

        FetchURL: `${baseURL}/api/login`,
        Type: "POST",
      };
      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            const postResult = result.Login[0];
            toast.success("Login sucessful", {
              theme: "light",
            });

            setIsSubmit(false);

            localStorage.setItem("token", JSON.stringify(postResult));
            sessionStorage.setItem("token", JSON.stringify(postResult));
            login(postResult);
            navigate("/admin-dashboard");
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
      <div className="login-form">
        <div className="wrapper uk-container">
          <div className="uk-grid uk-child-width-1-2@m" data-uk-grid>
            <div>
              <div className="login-img">
                <img src={img} alt="" />
              </div>
            </div>
            <div>
              <div className="form__content">
                <span className="sub__title">Hello !</span>
                <h3 className="mb-3 heading__title">Welcome to Login Page</h3>

                <form className="login-body uk-margin-top">
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
                    {" "}
                    Don't have an account?
                    <Link to="/register">Register</Link>
                  </p>
                  <button className="btn" onClick={handleSubmit}>
                    {isSubmit ? <span>Please wait..</span> : <span>Login</span>}
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

export default Login;
