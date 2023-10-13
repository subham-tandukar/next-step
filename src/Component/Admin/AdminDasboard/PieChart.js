import React, { useContext } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import BlogContext from "../../Context/blogContextFolder/blogContext";
import CategoryContext from "../../Context/categoryContextFolder/categoryContext";
import CourseContext from "../../Context/courseContextFolder/courseContext";

const PieChart = ({ bookingList }) => {
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
        <h4 className="uk-text-center">Pie Chart</h4>
        <div>
          <Pie
            height={270}
            width={270}
            data={{
              labels: ["Course", "Booking", "Blog", "Category"],
              datasets: [
                {
                  label: "Count",
                  data: [course, booking, blog, category],
                  backgroundColor: ["#2c3c54", "#6f8eed", "#184890", "#a5bbdd"],
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

export default PieChart;
