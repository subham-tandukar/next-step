import React, { useContext, useState, useRef, useEffect } from "react";
import AdminSidebar from "../Layout/AdminSidebar";
import AdminNavbar from "../Layout/AdminNavbar";
import { GiNotebook } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr";
import DataTable from "react-data-table-component";
import Toast from "../../Toast";
import { Fetchdata } from "../../Hook/getData";
import NavbarContext from "../../Context/Navbar-Context";

const AdminBooking = () => {
  const { baseURL } = useContext(NavbarContext);
  const [loading, setLoading] = useState(true);
  const [originalList, setOriginalList] = useState(null);

  //API to hit category list
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    bookingLst();
  }, []);

  const bookingLst = () => {
    const dataForm = {
      FetchURL: `${baseURL}/api/getBooking`,
      Type: "GET",
    };

    Fetchdata(dataForm).then(function (result) {
      if (result.StatusCode === 200) {
        const postResult = result.Values ? result.Values : "";
        setBookingList(postResult);
        setOriginalList(postResult);
        setLoading(false);
      } else {
        setBookingList([]);
        setOriginalList([]);
        setLoading(false);
      }
    });
  };

  const searchInput = useRef("");
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);

    const srchQuery = searchInput.current.value.toLowerCase();

    if (srchQuery) {
      let srchResult = originalList.filter((list) => {
        return list["Fullname"].toLowerCase().includes(srchQuery);
      });

      if (srchResult) {
        setBookingList(srchResult);
      } else {
        setBookingList({});
      }
    } else {
      setBookingList(originalList);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setBookingList(originalList);
  };

  const columns = [
    {
      name: "S.N.",
      width: "60px",
      center: true,
      cell: (row, index) => index + 1,
    },
    {
      name: "Fullname",
      //   width: "150px",
      sortable: true,
      filterable: true,
      selector: (row) => row.Fullname,
    },
    {
      name: "Email",
      // width: "200px",
      sortable: true,
      filterable: true,
      selector: (row) => row.Email,
    },
    {
      name: "Number",
      width: "110px",
      sortable: true,
      filterable: true,
      center: true,
      selector: (row) => row.PhoneNumber,
    },

    {
      name: "Address",
      //   width: "150px",
      sortable: true,
      filterable: true,
      selector: (row) => row.Address,
    },
    {
      name: "Course",
      //   width: "150px",
      sortable: true,
      filterable: true,
      selector: (row) => row.Course,
    },
    {
      name: "Payment",
      width: "150px",
      sortable: true,
      filterable: true,
      center: true,
      selector: (row) => (row.IsPaid ? "Paid" : "UnPaid"),
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
                  <GiNotebook />
                  Booking
                </h4>
              </div>

              <div className="content_wrapper">
                <DataTable
                  columns={columns}
                  data={bookingList}
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
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default AdminBooking;
