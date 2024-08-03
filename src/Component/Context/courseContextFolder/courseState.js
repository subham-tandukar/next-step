import React, { useContext, useEffect, useState } from "react";
import CourseContext from "./courseContext";
import $ from "jquery";
import { toast } from "react-toastify";
import { Fetchdata } from "../../Hook/getData";
import NavbarContext from "../Navbar-Context";

function CourseState(props) {
  const { baseURL } = useContext(NavbarContext);
  const initialValue = {
    title: "",
    price: "",
    noofseat: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalList, setOriginalList] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [image, setImage] = useState("");

  //API to hit course list
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    courseLst();
  }, []);

  const courseLst = () => {
    const dataForm = {
      FetchURL: `${baseURL}/api/getCourse`,
      Type: "GET",
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setCourseList(postResult);
        setOriginalList(postResult);
        setLoading(false);
      } else {
        setCourseList([]);
        setOriginalList([]);
        setLoading(false);
      }
    });
  };

  //   --- to edit course ---
  const [isEditSubmit, setIsEditSubmit] = useState(false);
  const [perId, setPerId] = useState(null);
  const handleEdit = (data) => {
    setPerId(data._id);
    setFormValue({
      title: data.Title,
      price: parseInt(data.Price) / 100,
      noofseat: data.NoOfSeat === 0 ? "0" : data.NoOfSeat,
    });
    setImage(data.Image.url);
    setIsUploaded(true);
    $(".edit-course-bg").fadeIn(300);
    $(".edit-course").slideDown(500);
  };
  const editData = () => {
    const dataForm = {
      FLAG: "U",
      CourseID: perId,
      Title: formValue.title,
      Price: parseInt(formValue.price),
      NoOfSeat: formValue.noofseat,
      Image: image,
      FetchURL: `${baseURL}/api/course`,
      Type: "POST",
    };
    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          setIsEditSubmit(false);
          $(".edit-course-bg").fadeOut(300);
          $(".edit-course").slideUp(500);
          toast.success(result.Message, {
            theme: "light",
          });
          courseLst();
        } else {
          toast.error(result.Message, {
            theme: "light",
          });
          setIsEditSubmit(false);
        }
      })
      .catch((result) => {
        setIsEditSubmit(false);
      });
  };

  //API to show course info
  const handleView = (data) => {
    $(".view-course-bg").fadeIn(300);
    $(".view-course").slideDown(500);
    setPerId(data._id);
  };
  const [viewloading, setViewloading] = useState(true);
  const [courseInfo, setCourseInfo] = useState([]);

  useEffect(() => {
    courseInf();
  }, [perId]);

  const courseInf = () => {
    const dataForm = {
      FLAG: "SI",
      CourseID: perId,
      Type: "POST",
      FetchURL: `${baseURL}/api/course`,
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setCourseInfo(postResult);
        setViewloading(false);
      } else {
        setCourseInfo([]);
        setViewloading(false);
      }
    });
  };

  // --- to delete course ---

  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = (data) => {
    $(".delete-course-bg").fadeIn(300);
    $(".delete-course").slideDown(500);
    setPerId(data._id);
  };

  const deleteCourse = () => {
    setIsDelete(true);
    const dataForm = {
      CourseID: perId,
      FLAG: "D",
      FetchURL: `${baseURL}/api/course`,
      Type: "POST",
    };

    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          courseLst();
          $(".delete-course-bg").fadeOut(300);
          $(".delete-course").slideUp(500);
          toast.success(result.Message, {
            theme: "light",
          });

          setIsDelete(false);
        } else {
          toast.error(result.Message, {
            theme: "light",
          });
          setIsDelete(false);
        }
      })
      .catch(() => {
        setIsDelete(false);
      });
  };

  return (
    <CourseContext.Provider
      value={{
        formValue,
        setFormValue,
        initialValue,
        isSubmit,
        setIsSubmit,
        courseList,
        setCourseList,
        courseLst,
        loading,
        originalList,
        courseInfo,
        setCourseInfo,
        handleEdit,
        isEditSubmit,
        setIsEditSubmit,
        perId,
        setPerId,
        isDelete,
        setIsDelete,
        handleDelete,
        deleteCourse,
        editData,
        handleView,
        viewloading,
        image,
        setImage,
        isUploaded,
        setIsUploaded,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
}

export default CourseState;
