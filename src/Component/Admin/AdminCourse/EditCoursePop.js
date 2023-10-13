import React, { useContext, useEffect } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import CloseIcon from "../../../Image/CloseIcon.svg";
import Plus from "../../../Image/Plus.png";
import CourseContext from "../../Context/courseContextFolder/courseContext";

const EditCoursePop = () => {
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
  } = useContext(CourseContext);
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
    $(".edit-course-bg").fadeOut(300);
    $(".edit-course").slideUp(500);
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
      <section className="popup-bg edit-course-bg">
        <div className="popup edit-course">
          <div className="popup-head">
            <h4>Edit Course</h4>
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
                  <label htmlFor="noofseat">
                    No of seat<sup className="sup-col">*</sup>
                  </label>
                  <input
                    type="number"
                    className="uk-input"
                    name="noofseat"
                    id="noofseat"
                    onChange={handleChange}
                    value={formValue.noofseat}
                  />
                </div>
                <div className="form-wrapper">
                  <label htmlFor="price">
                    Price<sup className="sup-col">*</sup>
                  </label>
                  <input
                    type="number"
                    className="uk-input"
                    name="price"
                    id="price"
                    onChange={handleChange}
                    value={formValue.price}
                  />
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

export default EditCoursePop;
