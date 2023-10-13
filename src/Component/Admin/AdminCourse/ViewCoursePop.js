import React, { useContext } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import CourseContext from "../../Context/courseContextFolder/courseContext";

const ViewCoursePop = () => {
  const { courseInfo, viewloading } = useContext(CourseContext);

  const handleClose = () => {
    $(".view-course-bg").fadeOut(300);
    $(".view-course").slideUp(500);
  };
  return (
    <>
      <section className="popup-bg view-course-bg">
        <div className="popup view-course">
          <div className="popup-head">
            <h4>View Course</h4>
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
                    {courseInfo.map((props) => {
                      const { Title, Price, NoOfSeat, Image } = props;
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
                              Price
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid rgb(225, 226, 227)",
                              }}
                            >
                              Rs.{parseInt(Price) / 100}
                            </td>
                          </tr>

                          <tr>
                            <td
                              className="uk-text-bold"
                              style={{ fontSize: "14px", color: "#000" }}
                            >
                              NoOfSeat
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid rgb(225, 226, 227)",
                              }}
                            >
                              {NoOfSeat}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="uk-text-bold"
                              style={{ fontSize: "14px", color: "#000" }}
                            >
                              Available
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid rgb(225, 226, 227)",
                              }}
                            >
                              {NoOfSeat > 0 ? "Yes" : "No"}
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

export default ViewCoursePop;
