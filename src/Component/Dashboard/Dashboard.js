import React, { useContext } from "react";
import banner from "../../Image/banner.jpeg";
import react from "../../Image/react.png";
import { BsGlobe } from "react-icons/bs";
import { AiFillMobile } from "react-icons/ai";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { PiBracketsAngleLight } from "react-icons/pi";
import {
  FaDigitalTachograph,
  FaArrowRight,
  FaRegCalendarAlt,
  FaRegUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import BlogContext from "../Context/blogContextFolder/blogContext";
import CourseContext from "../Context/courseContextFolder/courseContext";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { BiSolidCommentDetail } from "react-icons/bi";

const Dashboard = () => {
  const { blogList } = useContext(BlogContext);
  const { courseList } = useContext(CourseContext);
  const serviceData = [
    {
      id: 1,
      icon: <BsGlobe />,
      title: "Web development",
    },
    {
      id: 2,
      icon: <AiFillMobile />,
      title: "Mobile App development",
    },
    {
      id: 3,
      icon: <PiBracketsAngleLight />,
      title: "UI/UX design",
    },
    {
      id: 4,
      icon: <FaDigitalTachograph />,
      title: "Digital Marketing",
    },
    {
      id: 5,
      icon: <HiOutlineDesktopComputer />,
      title: "Search Engine Optimization",
    },
  ];
  const contactData = [
    {
      id: 1,
      icon: <AiFillMobile />,
      title: (
        <h2 className="link__title small">
          <a href="tel:9842121221">9842121221</a>
        </h2>
      ),
    },
    {
      id: 2,
      icon: <HiOutlineMail />,
      title: (
        <h2 className="link__title small">
          <a href="mailto:test@gmail.com">test@gmail.com</a>
        </h2>
      ),
    },
    {
      id: 3,
      icon: <CiLocationOn />,
      title: <h2>Kathmandu, Nepal</h2>,
    },
  ];
  return (
    <>
      <Navbar />
      <section className="hero-section">
        <img src={banner} alt="" />
        <div className="banner-txt">
          <div className="uk-container">
            <h1>Career focused IT courses</h1>
            <p>
              Join our courses and unlock your potential in the digital work.
              Learn advance courses from the experienced Software Engineers.
            </p>
            <div className="mt-30">
              <a className="btn" href="#course">
                <span>Start course</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section service-section" id="service">
        <div className="uk-container">
          <div className="title-wrapper">
            <h2>our services</h2>
            <p>We help ambitious clients achieve extraordinary outcomes</p>
          </div>

          <div className="content__wrapper">
            <div
              className="uk-grid uk-grid-large uk-child-width-1-3@m uk-child-width-1-2@s"
              data-uk-grid
            >
              {serviceData.map((props) => {
                const { id, icon, title } = props;
                return (
                  <div key={id}>
                    <div className="wrapper">
                      <div className="icon">{icon}</div>
                      <h2 className="the-title">{title}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {courseList.length > 0 && (
        <section className="section courses-section" id="course">
          <div className="uk-container">
            <div className="title-wrapper">
              <h2>Popular Courses</h2>
              <p>Learn the most popular skills on the market</p>
            </div>

            <div className="content__wrapper">
              <div
                className="uk-grid uk-grid-large uk-child-width-1-6@l uk-child-width-1-3@m uk-child-width-1-2 uk-flex-center"
                data-uk-grid
              >
                {courseList.map((props) => {
                  const { _id, Image, Price, NoOfSeat, Title } = props;
                  return (
                    <div key={_id}>
                      <div className="wrapper">
                        <h2 className="the-title">{Title}</h2>
                        <div className="icon mt-10">
                          <img alt="" src={Image.url} />
                        </div>
                        <h3>Rs.{parseInt(Price)} only</h3>
                        {NoOfSeat > 0 ? (
                          <p>
                            Seat Available: <strong>{NoOfSeat}</strong>{" "}
                          </p>
                        ) : (
                          <p>No Seat Available</p>
                        )}
                        <div className="mt-30">
                          <Link
                            to={`/booking-form/${_id}?course=${Title}&price=${Price}`}
                            className={`btn ${
                              NoOfSeat > 0 ? "" : "disable-btn"
                            }`}
                          >
                            <span>Book Now</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {blogList.length > 0 && (
        <section className="blog__section card__section section" id="blog">
          <div className="uk-container">
            <div className="title-wrapper">
              <h2>our blogs</h2>
              <p>See our latest blog</p>
            </div>

            <div className="content__wrapper">
              <div
                className="uk-grid uk-child-width-1-3@m uk-child-width-1-2@s"
                data-uk-grid
              >
                {blogList.map((props) => {
                  const {
                    _id,
                    Image,
                    CategoryID,
                    createdAt,
                    Auther,
                    Title,
                    Description,
                    Comments,
                  } = props;
                  // to get human readable timestamp
                  function formatDateWithTime(date) {
                    const formattedDate = new Date(date);
                    const year = formattedDate.getFullYear();
                    const month = formattedDate.getMonth() + 1; // Months are zero-based, so we add 1
                    const day = formattedDate.getDate();

                    return `${year}/${month}/${day}`;
                  }
                  return (
                    <div key={_id}>
                      <div className="wrapper">
                        <div className="hover__img">
                          <Link
                            to={`/blog-single/${_id}?categoryid=${CategoryID._id}`}
                          >
                            <img alt="" src={Image.url} />
                          </Link>
                          <div className="badge">
                            <span>{CategoryID.Category}</span>
                          </div>
                        </div>
                        <div className="project__head flex">
                          <div className="date">
                            <FaRegCalendarAlt />
                            <span>{formatDateWithTime(createdAt)}</span>
                          </div>
                          <div className="date">
                            <FaRegUser />
                            <span>{Auther}</span>
                          </div>
                        </div>
                        <div className="project__content">
                          <h2 className="link__title">
                            <Link
                              to={`/blog-single/${_id}?categoryid=${CategoryID._id}`}
                            >
                              {Title}
                            </Link>
                          </h2>

                          <div className="the__content mt-10">
                            <p>{Description}</p>
                          </div>
                        </div>
                        <div className="project__footer">
                          <div>
                            <Link
                              to={`/blog-single/${_id}?categoryid=${CategoryID._id}`}
                              className="btn btn-light"
                            >
                              <span>read more</span> <FaArrowRight />
                            </Link>
                          </div>
                          <div className="comments">
                            <BiSolidCommentDetail color="var(--primary)" />
                            {Comments.length > 0 ? (
                              <span>{Comments.length}</span>
                            ) : (
                              <span>0</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <section
        className="section contact__info area__focus light__bg"
        id="contact"
      >
        <div className="uk-container">
          <div className="uk-text-center">
            <div className="title-wrapper">
              <h2>Get in touch</h2>
              <p>We'd love to hear from you. Here's how you can reach us.</p>
            </div>
          </div>

          <div className="content__wrapper">
            <div
              className="uk-grid uk-grid-match uk-child-width-1-3@m uk-flex-center uk-child-width-1-2@s"
              data-uk-grid
            >
              {contactData.map((props) => {
                const { id, icon, title } = props;
                return (
                  <div key={id}>
                    <div className="wrapper">
                      <div className="icon">{icon}</div>
                      <div className="txt">{title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Dashboard;
