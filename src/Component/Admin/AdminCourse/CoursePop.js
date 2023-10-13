import React, { useContext, useEffect } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import NavbarContext from "../../Context/Navbar-Context";
import { Fetchdata } from "../../Hook/getData";
import { toast } from "react-toastify";
import CloseIcon from "../../../Image/CloseIcon.svg";
import Plus from "../../../Image/Plus.png";
import CourseContext from "../../Context/courseContextFolder/courseContext";

const CoursePop = () => {
  const { baseURL } = useContext(NavbarContext);
  const {
    formValue,
    setFormValue,
    initialValue,
    isSubmit,
    setIsSubmit,
    courseLst,
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
    $(".add-course-bg").fadeOut(300);
    $(".add-course").slideUp(500);
    setFormValue(initialValue);
    setIsSubmit(false);
    setIsUploaded(false);
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
      const dataForm = {
        FLAG: "I",
        Title: formValue.title,
        Price: parseInt(formValue.price) * 100,
        NoOfSeat: formValue.noofseat,
        Image: image,
        FetchURL: `${baseURL}/api/course`,
        Type: "POST",
      };
      Fetchdata(dataForm)
        .then(function (result) {
          if (result.StatusCode === 200) {
            setIsSubmit(false);
            setFormValue(initialValue);
            setIsUploaded(false);
            setImage(null);
            $(".add-course-bg").fadeOut(300);
            $(".add-course").slideUp(500);
            toast.success(result.Message, {
              theme: "light",
            });
            courseLst();
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
      <section className="popup-bg add-course-bg">
        <div className="popup add-course">
          <div className="popup-head">
            <h4>Add Course</h4>
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
                <span>{isSubmit ? "Please wait..." : "Submit"}</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CoursePop;
