import React, { useContext } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import CourseContext from "../../Context/courseContextFolder/courseContext";

const DeleteCoursePop = () => {
  const { deleteCourse, isDelete } = useContext(CourseContext);

  const handleClose = () => {
    $(".delete-course-bg").fadeOut(300);
    $(".delete-course").slideUp(500);
  };

  const handleDelete = () => {
    deleteCourse();
  };

  return (
    <>
      <section className="popup-bg delete-course-bg">
        <div className="popup delete-course">
          <div className="popup-head">
            <h4>Delete Course</h4>
            <div className="close" onClick={handleClose}>
              <GrFormClose size="2rem" color="#fff" />
            </div>
          </div>

          <div className="popup-body">
            <p style={{ color: "#000" }}>Are you sure you want to delete?</p>
          </div>
          <div className="popup-footer">
            <button
              className="btn uk-margin-small-right"
              onClick={handleDelete}
            >
              <span>{isDelete ? "Please wait ..." : "Delete"}</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeleteCoursePop;
