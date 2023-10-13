import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { FaRegCalendarAlt, FaRegUser, FaArrowRight } from "react-icons/fa";
import { BiSolidChevronsRight } from "react-icons/bi";
import CategoryContext from "../Context/categoryContextFolder/categoryContext";
import { Link, useLocation, useParams } from "react-router-dom";
import NavbarContext from "../Context/Navbar-Context";
import { Fetchdata } from "../Hook/getData";

const BlogSingle = () => {
  const { categoryList } = useContext(CategoryContext);
  const { baseURL } = useContext(NavbarContext);

  //   to get blog id
  const { id } = useParams();

  //   to get category id
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryid = searchParams.get("categoryid");

  const [viewloading, setViewloading] = useState(true);
  const [blogInfo, setBlogInfo] = useState([]);

  useEffect(() => {
    blogInf();
  }, [id]);

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

  return (
    <>
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
          <section className="section-t uk-margin-large-top">
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
            <section className="blog__section card__section section" id="blog">
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
