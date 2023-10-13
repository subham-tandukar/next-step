import React, { useContext } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import BlogContext from "../../Context/blogContextFolder/blogContext";

const ViewBlogPop = () => {
  const { blogInfo, viewloading } = useContext(BlogContext);

  const handleClose = () => {
    $(".view-blog-bg").fadeOut(300);
    $(".view-blog").slideUp(500);
  };
  return (
    <>
      <section className="popup-bg view-blog-bg">
        <div className="popup view-blog">
          <div className="popup-head">
            <h4>View Blog</h4>
            <div className="close" onClick={handleClose}>
              <GrFormClose size="2rem" color="#fff" />
            </div>
          </div>

          <div className="popup-body">
            {viewloading ? (
              "Loading..."
            ) : (
              <div className="view-box">
                <table className="uk-table uk-table-striped uk-table-hover view-table">
                  <tbody>
                    {blogInfo.map((props) => {
                      const { Title, Description, Auther, Image } = props;
                      return (
                        <>
                          <tr>
                            <td
                              className="uk-text-bold"
                              style={{ fontSize: "14px", color: "#000" }}
                            >
                              Title
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid rgb(225, 226, 227)",
                              }}
                            >
                              {Title}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="uk-text-bold"
                              style={{ fontSize: "14px", color: "#000" }}
                            >
                              Description
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid rgb(225, 226, 227)",
                              }}
                            >
                              {Description}
                            </td>
                          </tr>

                          <tr>
                            <td
                              className="uk-text-bold"
                              style={{ fontSize: "14px", color: "#000" }}
                            >
                              Auther
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid rgb(225, 226, 227)",
                              }}
                            >
                              {Auther}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="uk-text-bold"
                              style={{ fontSize: "14px", color: "#000" }}
                            >
                              Image
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid rgb(225, 226, 227)",
                              }}
                            >
                              <img src={Image.url} alt="" />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="popup-footer">
            <button className="btn btn-cancel" onClick={handleClose}>
              <span>Exit</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewBlogPop;
