import React, { useContext, useState, useRef } from "react";
import AdminSidebar from "../Layout/AdminSidebar";
import AdminNavbar from "../Layout/AdminNavbar";
import { BiCategory } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { HiPencilAlt } from "react-icons/hi";
import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import $ from "jquery";
import DataTable from "react-data-table-component";
import CategoryContext from "../../Context/categoryContextFolder/categoryContext";
import Toast from "../../Toast";
import CategoryPop from "./CategoryPop";
import EditCategoryPop from "./EditCategoryPop";
import ViewCategoryPop from "./ViewCategoryPop";
import DeleteCategoryPop from "./DeleteCategoryPop";

const AdminCategory = () => {
  const {
    setFormValue,
    initialValue,
    categoryList,
    handleEdit,
    handleView,
    handleDelete,
    loading,
    setCategoryList,
    originalList,
  } = useContext(CategoryContext);

  const handleAdd = () => {
    $(".add-category-bg").fadeIn(300);
    $(".add-category").slideDown(500);
    setFormValue(initialValue);
  };

  const searchInput = useRef("");
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);

    const srchQuery = searchInput.current.value.toLowerCase();

    if (srchQuery) {
      let srchResult = originalList.filter((list) => {
        return list["Category"].toLowerCase().includes(srchQuery);
      });

      if (srchResult) {
        setCategoryList(srchResult);
      } else {
        setCategoryList({});
      }
    } else {
      setCategoryList(originalList);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setCategoryList(originalList);
  };

  const columns = [
    {
      name: "S.N.",
      width: "60px",
      center: true,
      cell: (row, index) => index + 1,
    },
    {
      name: "Category",
      //   width: "150px",
      sortable: true,
      filterable: true,
      selector: (row) => row.Category,
    },

    {
      name: "Action",
      center: true,
      width: "120px",
      selector: (row) => {
        return (
          <>
            <span
              className="uk-margin-right"
              uk-tooltip="View"
              onClick={() => handleView(row)}
            >
              <FaRegEye />
            </span>

            <span
              className="uk-margin-right"
              uk-tooltip="Edit"
              onClick={() => handleEdit(row)}
            >
              <HiPencilAlt color="var(--primary)" />
            </span>

            <span uk-tooltip="Delete" onClick={() => handleDelete(row)}>
              <FaRegTrashAlt color="#ff0002" />
            </span>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Toast />
      <div className="layout-wrapper uk-flex">
        <aside>
          <AdminSidebar />
        </aside>

        <article>
          <AdminNavbar />
          <div className="wrapper-bg">
            <div className="wrapper">
              <div className="title uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
                <h4>
                  <BiCategory />
                  Category
                </h4>
                <div>
                  <button className="btn" onClick={handleAdd}>
                    <span>Add Category</span>
                  </button>
                </div>
              </div>

              <div className="content_wrapper">
                <DataTable
                  columns={columns}
                  data={categoryList}
                  // customStyles={customStyles}
                  pagination
                  fixedHeader
                  fixedHeaderScrollHeight="335px"
                  highlightOnHover
                  pointerOnHover
                  progressPending={loading}
                  responsive
                  subHeader
                  dense
                  striped
                  subHeaderComponent={
                    <>
                      <div className="filter uk-flex uk-flex-wrap uk-margin-small-bottom">
                        <div className="filter-option">
                          <input
                            ref={searchInput}
                            type="text"
                            id="search"
                            className="uk-input searchField"
                            placeholder="Search"
                            value={searchTerm}
                            // onChange={(e) => {
                            //   setSearchTerm(e.target.value);
                            // }}
                            onChange={searchHandler}
                          />
                          <div
                            className="clear"
                            onClick={handleClear}
                            uk-tooltip="Clear"
                          >
                            <GrFormClose size="1.5rem" />
                          </div>
                        </div>
                      </div>
                    </>
                  }
                />
              </div>

              <CategoryPop />
              <EditCategoryPop />
              <ViewCategoryPop />
              <DeleteCategoryPop />
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default AdminCategory;
