import React, { useContext, useEffect, useState } from "react";
import BlogContext from "./blogContext";
import $ from "jquery";
import { toast } from "react-toastify";
import { Fetchdata } from "../../Hook/getData";
import NavbarContext from "../Navbar-Context";

function BlogState(props) {
  const { baseURL } = useContext(NavbarContext);
  const userDetails = JSON.parse(localStorage.getItem("token"));
  const initialValue = {
    title: "",
    description: "",
    category: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalList, setOriginalList] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [image, setImage] = useState("");

  //API to hit blog list
  const [blogList, setBlogList] = useState([]);
  const [categoryID, setCategoryID] = useState("-1");

  useEffect(() => {
    blogLst();
  }, [categoryID]);

  const blogLst = () => {
    const dataForm = {
      FetchURL: `${baseURL}/api/getBlog?CategoryID=${categoryID}`,
      Type: "GET",
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setBlogList(postResult);
        setOriginalList(postResult);
        setLoading(false);
      } else {
        setBlogList([]);
        setOriginalList([]);
        setLoading(false);
      }
    });
  };

  //   --- to edit blog ---
  const [isEditSubmit, setIsEditSubmit] = useState(false);
  const [perId, setPerId] = useState(null);
  const handleEdit = (data) => {
    setPerId(data._id);
    setFormValue({
      title: data.Title,
      description: data.Description,
      category: data.CategoryID,
    });
    setImage(data.Image.url);
    setIsUploaded(true);
    $(".edit-blog-bg").fadeIn(300);
    $(".edit-blog").slideDown(500);
  };

  const editData = () => {
    const dataForm = {
      FLAG: "U",
      BlogID: perId,
      Title: formValue.title,
      Description: formValue.description,
      Auther: userDetails.Name,
      CategoryID: formValue.category,
      Image: image,
      FetchURL: `${baseURL}/api/blog`,
      Type: "POST",
    };
    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          setIsEditSubmit(false);
          $(".edit-blog-bg").fadeOut(300);
          $(".edit-blog").slideUp(500);
          toast.success(result.Message, {
            theme: "light",
          });
          blogLst();
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

  //API to show blog info
  const handleView = (data) => {
    $(".view-blog-bg").fadeIn(300);
    $(".view-blog").slideDown(500);
    setPerId(data._id);
  };
  const [viewloading, setViewloading] = useState(true);
  const [blogInfo, setBlogInfo] = useState([]);

  useEffect(() => {
    blogInf();
  }, [perId]);

  const blogInf = () => {
    const dataForm = {
      FLAG: "SI",
      BlogID: perId,
      Type: "POST",
      FetchURL: `${baseURL}/api/blog`,
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setBlogInfo(postResult);
        setViewloading(false);
      } else {
        setBlogInfo([]);
        setViewloading(false);
      }
    });
  };

  // --- to delete blog ---

  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = (data) => {
    $(".delete-blog-bg").fadeIn(300);
    $(".delete-blog").slideDown(500);
    setPerId(data._id);
  };

  const deleteBlog = () => {
    setIsDelete(true);
    const dataForm = {
      BlogID: perId,
      FLAG: "D",
      FetchURL: `${baseURL}/api/blog`,
      Type: "POST",
    };

    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          blogLst();
          $(".delete-blog-bg").fadeOut(300);
          $(".delete-blog").slideUp(500);
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
    <BlogContext.Provider
      value={{
        formValue,
        setFormValue,
        initialValue,
        isSubmit,
        setIsSubmit,
        blogList,
        setBlogList,
        blogLst,
        loading,
        originalList,
        blogInfo,
        setBlogInfo,
        handleEdit,
        isEditSubmit,
        setIsEditSubmit,
        perId,
        setPerId,
        isDelete,
        setIsDelete,
        handleDelete,
        deleteBlog,
        editData,
        handleView,
        viewloading,
        categoryID,
        setCategoryID,
        image,
        setImage,
        isUploaded,
        setIsUploaded,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
}

export default BlogState;
