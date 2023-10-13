import React, { useContext, useEffect } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import BlogContext from "../../Context/blogContextFolder/blogContext";
import CloseIcon from "../../../Image/CloseIcon.svg";
import Plus from "../../../Image/Plus.png";
import CategoryContext from "../../Context/categoryContextFolder/categoryContext";

const EditBlogPop = () => {
  const {
    formValue,
    setFormValue,
    initialValue,
    isEditSubmit,
    setIsEditSubmit,
    editData,
    image,
    setImage,
    isUploaded,
    setIsUploaded,
  } = useContext(BlogContext);
  const { categoryList } = useContext(CategoryContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleClose = () => {
    $(".edit-blog-bg").fadeOut(300);
    $(".edit-blog").slideUp(500);
    setFormValue(initialValue);
    setIsEditSubmit(false);
    setIsUploaded(false);
    setImage(null);
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
      <section className="popup-bg edit-blog-bg">
        <div className="popup edit-blog">
          <div className="popup-head">
            <h4>Edit Blog</h4>
            <div className="close" onClick={handleClose}>
              <GrFormClose size="2rem" color="#fff" />
            </div>
          </div>

          <form>
            <div className="popup-body">
              <div>
                <div className="form-wrapper">
                  <label htmlFor="title">
                    Title<sup className="sup-col">*</sup>
                  </label>
                  <input
                    type="text"
                    className="uk-input"
                    name="title"
                    id="title"
                    onChange={handleChange}
                    value={formValue.title}
                  />
                </div>
                <div className="form-wrapper">
                  <label htmlFor="description">
                    Description<sup className="sup-col">*</sup>
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    onChange={handleChange}
                    value={formValue.description}
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
                <div className="form-wrapper">
                  <label htmlFor="category">
                    Category<sup className="sup-col">*</sup>
                  </label>
                  <select
                    value={formValue.category}
                    name="category"
                    onChange={handleChange}
                  >
                    <option disabled value="" selected>
                      Select Category
                    </option>
                    {categoryList.map((list) => (
                      <>
                        <option key={list._id} value={list._id}>
                          {list.Category}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div className="form-wrapper">
                  <label>
                    Add Image<sup className="sup-col">*</sup>
                  </label>
                  <div className="BoxUpload">
                    <div className="image-upload">
                      {!isUploaded ? (
                        <>
                          <label htmlFor="upload-input">
                            <img
                              src={Plus}
                              draggable={"false"}
                              alt="placeholder"
                              style={{
                                width: 90,
                                height: 100,
                                paddingTop: "10px",
                              }}
                            />
                          </label>

                          <input
                            id="upload-input"
                            type="file"
                            accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                            onChange={handleImageChange}
                            name="image"
                          />
                        </>
                      ) : (
                        <div className="ImagePreview">
                          <img
                            className="close-icon"
                            src={CloseIcon}
                            alt="CloseIcon"
                            onClick={() => {
                              setIsUploaded(false);
                              setImage(null);
                            }}
                          />

                          <img
                            id="uploaded-image"
                            src={image}
                            draggable={false}
                            alt="uploaded-img"
                          />
                        </div>
                      )}
                    </div>
                  </div>
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

export default EditBlogPop;
