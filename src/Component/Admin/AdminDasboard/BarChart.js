import React, { useContext } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import BlogContext from "../../Context/blogContextFolder/blogContext";
import CategoryContext from "../../Context/categoryContextFolder/categoryContext";
import CourseContext from "../../Context/courseContextFolder/courseContext";

const BarChart = ({ bookingList }) => {
  const { blogList } = useContext(BlogContext);
  const { categoryList } = useContext(CategoryContext);
  const { courseList } = useContext(CourseContext);

  const blog = blogList.length;
  const category = categoryList.length;
  const course = courseList.length;
  const booking = bookingList.length;
  return (
    <>
      <div className="box">
        <h4 className="uk-text-center">Bar Chart</h4>
        <div>
          <Bar
            height={270}
            width={270}
            data={{
              labels: [""],
              datasets: [
                {
                  label: "Course",
                  data: [course],
                  backgroundColor: "#2c3c54",
                  borderWidth: 1,
                },
                {
                  label: "Booking",
                  data: [booking],
                  backgroundColor: "#6f8eed",
                  borderWidth: 1,
                },
                {
                  label: "Blog",
                  data: [blog],
                  backgroundColor: "#184890",
                  borderWidth: 1,
                },
                {
                  label: "Category",
                  data: [category],
                  backgroundColor: "#a5bbdd",
                  borderWidth: 1,
                },
              ],
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="uk-flex uk-flex-center uk-margin-top ">
          <h5>
            {course} <br />
            Course
          </h5>
          <h5>
            {booking} <br />
            Booking
          </h5>
          <h5>
            {blog} <br /> Blog
          </h5>
          <h5>
            {category} <br />
            Category
          </h5>
        </div>
      </div>
    </>
  );
};

export default BarChart;
