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
import CoursePop from "./CoursePop";
import DeleteCoursePop from "./DeleteCoursePop";
import EditCoursePop from "./EditCoursePop";
import ViewCoursePop from "./ViewCoursePop";
import CourseContext from "../../Context/courseContextFolder/courseContext";

const AdminCourse = () => {
  const {
    setFormValue,
    initialValue,
    courseList,
    handleEdit,
    handleView,
    handleDelete,
    loading,
    setCourseList,
    setIsUploaded,
    setImage,
    originalList,
  } = useContext(CourseContext);

  const handleAdd = () => {
    $(".add-course-bg").fadeIn(300);
    $(".add-course").slideDown(500);
    setFormValue(initialValue);
    setIsUploaded(false);
    setImage(null);
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
        setCourseList(srchResult);
      } else {
        setCourseList({});
      }
    } else {
      setCourseList(originalList);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setCourseList(originalList);
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
      name: "Price (Rs.)",
      width: "100px",
      selector: (row) => parseInt(row.Price),
    },
    {
      name: "No Of Seat",
      width: "100px",
      selector: (row) => (row.NoOfSeat < 0 ? "0" : row.NoOfSeat),
    },
    {
      name: "Available",
      width: "100px",
      selector: (row) => (row.NoOfSeat > 0 ? "Yes" : "No"),
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
                  Course
                </h4>
                <div>
                  <button className="btn" onClick={handleAdd}>
                    <span>Add Course</span>
                  </button>
                </div>
              </div>

              <div className="content_wrapper">
                <DataTable
                  columns={columns}
                  data={courseList}
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

              <CoursePop />
              <DeleteCoursePop />
              <EditCoursePop />
              <ViewCoursePop />
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default AdminCourse;
