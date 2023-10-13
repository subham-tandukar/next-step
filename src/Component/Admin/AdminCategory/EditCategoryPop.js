import React, { useContext, useEffect } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import CategoryContext from "../../Context/categoryContextFolder/categoryContext";

const EditCategoryPop = () => {
  const {
    formValue,
    setFormValue,
    initialValue,
    isEditSubmit,
    setIsEditSubmit,
    editData,
  } = useContext(CategoryContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleClose = () => {
    $(".edit-category-bg").fadeOut(300);
    $(".edit-category").slideUp(500);
    setFormValue(initialValue);
    setIsEditSubmit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditSubmit(true);
  };

  useEffect(() => {
    if (isEditSubmit) {
      editData();
    } else {
      setIsEditSubmit(false);
    }
  }, [isEditSubmit]);

  return (
    <>
      <section className="popup-bg edit-category-bg">
        <div className="popup edit-category">
          <div className="popup-head">
            <h4>Edit Category</h4>
            <div className="close" onClick={handleClose}>
              <GrFormClose size="2rem" color="#fff" />
            </div>
          </div>

          <form>
            <div className="popup-body">
              <div>
                <div className="form-wrapper">
                  <label htmlFor="category">
                    Category<sup className="sup-col">*</sup>
                  </label>
                  <input
                    type="text"
                    className="uk-input"
                    name="category"
                    id="category"
                    onChange={handleChange}
                    value={formValue.category}
                  />
                </div>
              </div>
            </div>
            <div className="popup-footer">
              <button
                className="btn uk-margin-small-right"
                onClick={handleSubmit}
              >
                <span>{isEditSubmit ? "Please wait..." : "Update"}</span>
              </button>
             
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditCategoryPop;
