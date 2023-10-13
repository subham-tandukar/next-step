import React, { useContext, useEffect } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import CategoryContext from "../../Context/categoryContextFolder/categoryContext";
import NavbarContext from "../../Context/Navbar-Context";
import { Fetchdata } from "../../Hook/getData";
import { toast } from "react-toastify";

const CategoryPop = () => {
  const { baseURL } = useContext(NavbarContext);
  const {
    formValue,
    setFormValue,
    initialValue,
    isSubmit,
    setIsSubmit,
    categoryLst,
  } = useContext(CategoryContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleClose = () => {
    $(".add-category-bg").fadeOut(300);
    $(".add-category").slideUp(500);
    setFormValue(initialValue);
    setIsSubmit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
      const dataForm = {
        FLAG: "I",
        Category: formValue.category,
        FetchURL: `${baseURL}/api/category`,
        Type: "POST",
      };
      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            setIsSubmit(false);
            setFormValue(initialValue);
            $(".add-category-bg").fadeOut(300);
            $(".add-category").slideUp(500);
            toast.success(result.Message, {
              theme: "light",
            });
            categoryLst();
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
      <section className="popup-bg add-category-bg">
        <div className="popup add-category">
          <div className="popup-head">
            <h4>Add Category</h4>
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
                <span>{isSubmit ? "Please wait..." : "Submit"}</span>
              </button>
            
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CategoryPop;
