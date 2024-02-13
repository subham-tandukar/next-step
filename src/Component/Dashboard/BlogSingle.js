import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import {
  FaRegCalendarAlt,
  FaRegUser,
  FaArrowRight,
  FaUserCircle,
} from "react-icons/fa";
import { BiSolidChevronsRight } from "react-icons/bi";
import CategoryContext from "../Context/categoryContextFolder/categoryContext";
import { Link, useLocation, useParams } from "react-router-dom";
import NavbarContext from "../Context/Navbar-Context";
import { Fetchdata } from "../Hook/getData";
import { BiSolidCommentDetail } from "react-icons/bi";
import { toast } from "react-toastify";
import Toast from "../Toast";

const BlogSingle = () => {
  const { categoryList } = useContext(CategoryContext);
  const { baseURL } = useContext(NavbarContext);

  const initialValue = {
    msg: "",
    name: "",
    email: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  //   to get blog id
  const { id } = useParams();

  console.log("id", id);

  //   to get category id
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryid = searchParams.get("categoryid");

  const [showAllComments, setShowAllComments] = useState(false);
  const handleViewMoreClick = () => {
    setShowAllComments(!showAllComments);
  };

  const [viewloading, setViewloading] = useState(true);
  const [blogInfo, setBlogInfo] = useState([]);

  useEffect(() => {
    blogInf();
  }, [id,categoryid]);

  const blogInf = () => {
    const dataForm = {
      FLAG: "SI",
      BlogID: id,
      Type: "POST",
      FetchURL: `${baseURL}/api/blog`,
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setTimeout(() => {
          setBlogInfo(postResult);
          setViewloading(false);
        }, 500);
      } else {
        setBlogInfo([]);
        setViewloading(false);
      }
    });
  };

  //API to hit blog list
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    blogLst();
  }, [categoryid]);

  const blogLst = () => {
    const dataForm = {
      FetchURL: `${baseURL}/api/getBlog?CategoryID=${categoryid}`,
      Type: "GET",
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setBlogList(postResult);
      } else {
        setBlogList([]);
      }
    });
  };

  const filteredList = blogList.filter((item, i) => {
    return item._id !== id;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.msg || !formValue.name || !formValue.email) {
      toast.error("Please fill all required fields", {
        theme: "light",
      });
    } else {
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      const dataForm = {
        FLAG: "UC",
        BlogID: id,
        Comments: [
          {
            Name: formValue.name,
            Email: formValue.email,
            Cmt: formValue.msg,
          },
        ],
        FetchURL: `${baseURL}/api/blog`,
        Type: "POST",
      };
      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            setIsSubmit(false);
            setFormValue(initialValue);

            toast.success(result.Message, {
              theme: "light",
            });
            blogInf();
            blogLst();
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
      {viewloading ? (
        <div class="pre-loader">
          <div class="loading">
            <div class="loader-icon"></div>
            <span>Please wait...</span>
          </div>
        </div>
      ) : (
        <div className="single__blog default__header">
          <Navbar />
          <section className="section uk-margin-large-top">
            <div className="uk-container">
              <div className="uk-grid" data-uk-grid>
                <div className="uk-width-2-3@m">
                  {blogInfo.map((props) => {
                    const {
                      _id,
                      Image,
                      Title,
                      Description,
                      Auther,
                      createdAt,
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

                    const displayedComments = showAllComments
                      ? Comments.sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                      : Comments.sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        ).slice(0, 3);
                    return (
                      <div key={_id}>
                        <h1 className="single__head">{Title}</h1>

                        <div className="meta__info light__bg">
                          <div>
                            <FaRegUser />
                            <span>{Auther}</span>
                          </div>
                          <div>
                            <FaRegCalendarAlt />
                            <span>{formatDateWithTime(createdAt)}</span>
                          </div>
                        </div>

                        <div className="mt-30">
                          <img src={Image.url} alt="img" />
                        </div>

                        <div className="the__content mt-20">
                          <p>{Description}</p>
                        </div>

                        <hr />

                        <div className="reply__box">
                          <h2 className="the__title">Leave a Reply</h2>
                          <form>
                            <div className="wrapper">
                              <textarea
                                name="msg"
                                onChange={handleChange}
                                value={formValue.msg}
                                cols="30"
                                rows="10"
                                placeholder="Write a message"
                                required
                              ></textarea>
                            </div>
                            <div className="wrapper">
                              <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={formValue.name}
                                placeholder="Name*"
                                required
                              />
                            </div>
                            <div className="wrapper">
                              <input
                                type="email"
                                placeholder="Email*"
                                required
                                name="email"
                                onChange={handleChange}
                                value={formValue.email}
                              />
                            </div>
                            <div className="wrapper">
                              <button
                                className="btn mt-20"
                                onClick={handleSubmit}
                                type="submit"
                              >
                                <span>
                                  {isSubmit
                                    ? "Please wait..."
                                    : "Post a comment"}
                                </span>
                              </button>
                            </div>
                          </form>
                        </div>

                        <hr />

                        <div className="comment__section">
                          <h2 class="the__title">{`Comments (${Comments.length})`}</h2>
                          {Comments.length > 0 ? (
                            <>
                              {displayedComments.map((props) => {
                                const { _id, Name, Email, Cmt, createdAt } =
                                  props;
                                // to get human readable timestamp
                                function formatDateWithTime(date) {
                                  const formattedDate = new Date(date);
                                  const year = formattedDate.getFullYear();
                                  const month = formattedDate.getMonth() + 1; // Months are zero-based, so we add 1
                                  const day = formattedDate.getDate();
                                  const hours = formattedDate.getHours();
                                  let minutes = formattedDate.getMinutes();
                                  const ampm = hours >= 12 ? "PM" : "AM";
                                  // Convert hours from 24-hour format to 12-hour format
                                  const displayHours = hours % 12 || 12;
                                  // Ensure minutes are displayed with leading zero if less than 10
                                  if (minutes < 10) {
                                    minutes = `0${minutes}`;
                                  }
                                  return `${formatDayAndDate(
                                    `${year}/${month}/${day}`
                                  )} at ${displayHours}:${minutes} ${ampm}`;
                                }

                                function formatDayAndDate(date) {
                                  const options = {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  };
                                  return new Date(date).toLocaleDateString(
                                    "en-US",
                                    options
                                  );
                                }

                                return (
                                  <div
                                    key={_id}
                                    className="light__bg comment__wrapper"
                                  >
                                    <div className="comment__info">
                                      <div className="comment__profile">
                                        <FaUserCircle size="2rem" />
                                      </div>
                                      <div className="comment__title">
                                        <h3>{Name}</h3>
                                        <span>{Email}</span>
                                      </div>
                                    </div>

                                    <div className="comment__desc the__content">
                                      <p>{Cmt}</p>
                                    </div>

                                    <div className="comment__time">
                                      Posted on {formatDateWithTime(createdAt)}
                                    </div>
                                  </div>
                                );
                              })}
                              {Comments.length > 3 && (
                                <div className="uk-text-center">
                                  <button
                                    className="btn"
                                    onClick={handleViewMoreClick}
                                  >
                                    <span>
                                      {showAllComments
                                        ? "View Less"
                                        : "View More"}
                                    </span>
                                  </button>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="light__bg uk-padding-small">
                              <p className="uk-text-center uk-margin-remove">
                                No Comments.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="uk-width-1-3@m">
                  <div className="sticky__top">
                    <h2 className="the__title">Category</h2>
                    <div className="side__bar mt-20 light__bg">
                      <div className="list__item">
                        <ul>
                          {categoryList.map((list) => (
                            <li key={list._id}>
                              <Link
                                to={`/category-page/${list._id}?category=${list.Category}`}
                              >
                                <BiSolidChevronsRight />
                                {list.Category}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {filteredList.length > 0 && (
            <section
              className="blog__section card__section section-b"
              id="blog"
            >
              <div className="uk-container">
                <div className="title-wrapper">
                  <h2>related blogs</h2>
                </div>

                <div className="content__wrapper">
                  <div
                    className="uk-grid uk-child-width-1-3@m uk-child-width-1-2@s"
                    data-uk-grid
                  >
                    {filteredList.map((props) => {
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
                                onClick={() => {
                                  setViewloading(true);
                                  blogInf();
                                }}
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
                                  onClick={() => {
                                    setViewloading(true);
                                    blogInf();
                                  }}
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
                                  onClick={() => {
                                    setViewloading(true);
                                    blogInf();
                                  }}
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
          <Footer />
        </div>
      )}
    </>
  );
};

export default BlogSingle;
