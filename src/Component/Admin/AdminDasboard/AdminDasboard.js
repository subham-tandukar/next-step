import React, { useContext, useEffect, useState } from "react";
import AdminNavbar from "../Layout/AdminNavbar";
import AdminSidebar from "../Layout/AdminSidebar";
import { AiOutlineDashboard } from "react-icons/ai";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import NavbarContext from "../../Context/Navbar-Context";
import { Fetchdata } from "../../Hook/getData";

const AdminDasboard = () => {
  const { baseURL } = useContext(NavbarContext);

  //API to hit booking list
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
      } else {
        setBookingList([]);
      }
    });
  };
  return (
    <>
      <div className="layout-wrapper uk-flex">
        <aside>
          <AdminSidebar />
        </aside>

        <article>
          <AdminNavbar />
          <div className="wrapper-bg">
            <div className="wrapper">
              <div className="title">
                <h4>
                  <AiOutlineDashboard />
                  Dashboard
                </h4>
              </div>

              <div className="content_wrapper">
                <div className="uk-grid uk-child-width-1-2@m">
                  <div>
                    <PieChart bookingList={bookingList}/>
                  </div>
                  <div>
                    <BarChart bookingList={bookingList}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default AdminDasboard;
