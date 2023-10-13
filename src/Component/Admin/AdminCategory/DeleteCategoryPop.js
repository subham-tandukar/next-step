import React, { useContext } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import CategoryContext from "../../Context/categoryContextFolder/categoryContext";

const DeleteCategoryPop = () => {
  const { deleteCategory, isDelete } = useContext(CategoryContext);

  const handleClose = () => {
    $(".delete-category-bg").fadeOut(300);
    $(".delete-category").slideUp(500);
  };

  const handleDelete = () => {
    deleteCategory();
  };

  return (
    <>
      <section className="popup-bg delete-category-bg">
        <div className="popup delete-category">
          <div className="popup-head">
            <h4>Delete Category</h4>
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

export default DeleteCategoryPop;
