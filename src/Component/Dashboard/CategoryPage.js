import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { FaArrowRight, FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import NavbarContext from "../Context/Navbar-Context";
import { Fetchdata } from "../Hook/getData";

const CategoryPage = () => {
  const { baseURL } = useContext(NavbarContext);

  //   to get category id
  const { id } = useParams();

  //   to get category name
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  //API to hit blog list
  const [blogList, setBlogList] = useState([]);
  const [viewloading, setViewloading] = useState(true);
  useEffect(() => {
    blogLst();
  }, [id]);

  const blogLst = () => {
    const dataForm = {
      FetchURL: `${baseURL}/api/getBlog?CategoryID=${id}`,
      Type: "GET",
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setBlogList(postResult);
        setViewloading(false);
      } else {
        setBlogList([]);
        setViewloading(false);
      }
    });
  };

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
        <>
          <div className="single__blog default__header">
            <Navbar />

            <section className="uk-margin-large-top blog__section card__section section">
              <div className="uk-container">
                <div className="title-wrapper">
                  <h2>{category}</h2>
                </div>

                <div className="content__wrapper">
                  {blogList.length > 0 ? (
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
                                <Link
                                  to={`/blog-single/${_id}?categoryid=${CategoryID._id}`}
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
                  ) : (
                    <p className="uk-text-center">No data</p>
                  )}
                </div>
              </div>
            </section>

            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default CategoryPage;
