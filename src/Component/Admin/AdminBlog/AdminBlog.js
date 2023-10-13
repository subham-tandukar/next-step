import React, { useContext, useState, useRef } from "react";
import AdminSidebar from "../Layout/AdminSidebar";
import AdminNavbar from "../Layout/AdminNavbar";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import { HiPencilAlt } from "react-icons/hi";
import { FaRegTrashAlt, FaRegEye } from "react-icons/fa";
import $ from "jquery";
import DataTable from "react-data-table-component";
import Toast from "../../Toast";
import BlogContext from "../../Context/blogContextFolder/blogContext";
import BlogPop from "./BlogPop";
import DeleteBlogPop from "./DeleteBlogPop";
import EditBlogPop from "./EditBlogPop";
import ViewBlogPop from "./ViewBlogPop";

const AdminBlog = () => {
  const {
    setFormValue,
    initialValue,
    blogList,
    handleEdit,
    handleView,
    handleDelete,
    loading,
    setBlogList,
    originalList,
  } = useContext(BlogContext);

  const handleAdd = () => {
    $(".add-blog-bg").fadeIn(300);
    $(".add-blog").slideDown(500);
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
        return list["Title"].toLowerCase().includes(srchQuery);
      });

      if (srchResult) {
        setBlogList(srchResult);
      } else {
        setBlogList({});
      }
    } else {
      setBlogList(originalList);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setBlogList(originalList);
  };

  const columns = [
    {
      name: "S.N.",
      width: "60px",
      center: true,
      cell: (row, index) => index + 1,
    },
    {
      name: "Image",
      width: "70px",
      selector: (row) => <img src={row.Image.url} alt="" />,
    },
    {
      name: "Title",
      // width: "200px",
      sortable: true,
      filterable: true,
      selector: (row) => row.Title,
    },
    {
      name: "Description",
      width: "500px",
      selector: (row) => row.Description,
    },
    {
      name: "Category",
      width: "150px",
      selector: (row) => row.CategoryID.Category,
    },
    {
      name: "Auther",
      width: "100px",
      selector: (row) => row.Auther.split(" ")[0],
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
                  <MdOutlineSpeakerNotes />
                  Blog
                </h4>
                <div>
                  <button className="btn" onClick={handleAdd}>
                    <span>Add Blog</span>
                  </button>
                </div>
              </div>

              <div className="content_wrapper">
                <DataTable
                  columns={columns}
                  data={blogList}
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

              <BlogPop />
              <DeleteBlogPop />
              <EditBlogPop/>
              <ViewBlogPop/>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default AdminBlog;
