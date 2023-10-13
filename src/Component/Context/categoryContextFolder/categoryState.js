import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "./categoryContext";
import $ from "jquery";
import { toast } from "react-toastify";
import { Fetchdata } from "../../Hook/getData";
import NavbarContext from "../Navbar-Context";

function CategoryState(props) {
  const { baseURL } = useContext(NavbarContext);

  const initialValue = {
    category: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalList, setOriginalList] = useState(null);

  //API to hit category list
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    categoryLst();
  }, []);

  const categoryLst = () => {
    const dataForm = {
      FLAG: "S",
      Status: "-1",
      Type: "POST",
      FetchURL: `${baseURL}/api/category`,
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setCategoryList(postResult);
        setOriginalList(postResult);
        setLoading(false);
      } else {
        setCategoryList([]);
        setOriginalList([]);
        setLoading(false);
      }
    });
  };

  //   --- to edit category ---
  const [isEditSubmit, setIsEditSubmit] = useState(false);
  const [perId, setPerId] = useState(null);
  const handleEdit = (data) => {
    setPerId(data._id);
    setFormValue({
      category: data.Category,
    });
    $(".edit-category-bg").fadeIn(300);
    $(".edit-category").slideDown(500);
  };

  const editData = () => {
    const dataForm = {
      FLAG: "U",
      Category: formValue.category,
      CategoryID: perId,
      FetchURL: `${baseURL}/api/category`,
      Type: "POST",
    };
    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          setIsEditSubmit(false);
          $(".edit-category-bg").fadeOut(300);
          $(".edit-category").slideUp(500);
          toast.success(result.Message, {
            theme: "light",
          });
          categoryLst();
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

  //API to show category info
  const handleView = (data) => {
    $(".view-category-bg").fadeIn(300);
    $(".view-category").slideDown(500);
    setPerId(data._id);
  };
  const [viewloading, setViewloading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState([]);

  useEffect(() => {
    categoryInf();
  }, [perId]);

  const categoryInf = () => {
    const dataForm = {
      FLAG: "SI",
      CategoryID: perId,
      Type: "POST",
      FetchURL: `${baseURL}/api/category`,
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values[0] ? result.Values[0] : "";
        setCategoryInfo(postResult);
        setViewloading(false);
      } else {
        setCategoryInfo([]);
        setViewloading(false);
      }
    });
  };

  // --- to delete category ---

  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = (data) => {
    $(".delete-category-bg").fadeIn(300);
    $(".delete-category").slideDown(500);
    setPerId(data._id);
  };

  const deleteCategory = () => {
    setIsDelete(true);
    const dataForm = {
      CategoryID: perId,
      FLAG: "D",
      FetchURL: `${baseURL}/api/category`,
      Type: "POST",
    };

    Fetchdata(dataForm)
      .then(function (result) {
        if (result.StatusCode === 200) {
          categoryLst();
          $(".delete-category-bg").fadeOut(300);
          $(".delete-category").slideUp(500);
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
    <CategoryContext.Provider
      value={{
        formValue,
        setFormValue,
        initialValue,
        isSubmit,
        setIsSubmit,
        categoryList,
        setCategoryList,
        categoryLst,
        loading,
        originalList,
        categoryInfo,
        setCategoryInfo,
        handleEdit,
        isEditSubmit,
        setIsEditSubmit,
        perId,
        setPerId,
        isDelete,
        setIsDelete,
        handleDelete,
        deleteCategory,
        editData,
        handleView,
        viewloading,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
}

export default CategoryState;
