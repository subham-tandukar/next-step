import React, { useContext } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import BlogContext from "../../Context/blogContextFolder/blogContext";

const DeleteBlogPop = () => {
  const { deleteBlog, isDelete } = useContext(BlogContext);

  const handleClose = () => {
    $(".delete-blog-bg").fadeOut(300);
    $(".delete-blog").slideUp(500);
  };

  const handleDelete = () => {
    deleteBlog();
  };

  return (
    <>
      <section className="popup-bg delete-blog-bg">
        <div className="popup delete-blog">
          <div className="popup-head">
            <h4>Delete Blog</h4>
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

export default DeleteBlogPop;
