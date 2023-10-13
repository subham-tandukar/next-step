import React, { useContext } from "react";
import "./App.css";
import "./Css/Admin.css";
import Login from "./Component/login/Login";
import Register from "./Component/Register/Register";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AuthContext from "./Component/Context/Auth-Context";
import Dashboard from "./Component/Dashboard/Dashboard";
import AdminDasboard from "./Component/Admin/AdminDasboard/AdminDasboard";
import AdminBlog from "./Component/Admin/AdminBlog/AdminBlog";
import PageNotFound from "./Component/PageNotFound";
import AdminCategory from "./Component/Admin/AdminCategory/AdminCategory";
import CategoryState from "./Component/Context/categoryContextFolder/categoryState";
import BlogState from "./Component/Context/blogContextFolder/blogState";
import BlogSingle from "./Component/Dashboard/BlogSingle";
import ScrollToTop from "./Component/ScrollToTop";
import CategoryPage from "./Component/Dashboard/CategoryPage";
import CourseState from "./Component/Context/courseContextFolder/courseState";
import AdminCourse from "./Component/Admin/AdminCourse/AdminCourse";
import BookingForm from "./Component/Dashboard/BookingForm";
import Success from "./Component/Dashboard/Success";
import AdminBooking from "./Component/Admin/AdminBooking/AdminBooking";

const App = () => {
  const { UserDATA } = useContext(AuthContext);
  const currentLocation = useLocation();

  return (
    <>
      <CourseState>
        <CategoryState>
          <BlogState>
            <ScrollToTop />

            <Routes>
              {/*  For user */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/blog-single/:id" element={<BlogSingle />} />
              <Route path="/category-page/:id" element={<CategoryPage />} />
              <Route path="/booking-form/:id" element={<BookingForm />} />
              <Route path="/success" element={<Success />} />
              {/*  For user */}

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/*  No page found */}
              {!UserDATA && <Route path="*" element={<PageNotFound />} />}
              {/*  No page found */}
            </Routes>

            {/* Redirect to admin-dashboard if tried to login */}
            {UserDATA && currentLocation.pathname === "/login" ? (
              <Navigate to="/admin-dashboard" />
            ) : null}
            {/* Redirect to admin-dashboard if tried to login */}

            {/* For admin if logged in */}
            {UserDATA && (
              <Routes>
                <Route path="/admin-dashboard" element={<AdminDasboard />} />
                <Route path="/admin-category" element={<AdminCategory />} />
                <Route path="/admin-blog" element={<AdminBlog />} />
                <Route path="/admin-course" element={<AdminCourse />} />
                <Route path="/admin-booking" element={<AdminBooking />} />
              </Routes>
            )}
            {/* For admin if logged in */}
          </BlogState>
        </CategoryState>
      </CourseState>
    </>
  );
};

export default App;
