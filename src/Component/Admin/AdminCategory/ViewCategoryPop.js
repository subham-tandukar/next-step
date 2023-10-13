import React, { useContext } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import CategoryContext from "../../Context/categoryContextFolder/categoryContext";

const ViewCategoryPop = () => {
  const { categoryInfo, viewloading } = useContext(CategoryContext);

  const handleClose = () => {
    $(".view-category-bg").fadeOut(300);
    $(".view-category").slideUp(500);
  };

  const viewList = [
    {
      id: 1,
      title: "Category",
      body: categoryInfo.Category,
    },

  ];

  return (
    <>
      <section className="popup-bg view-category-bg">
        <div className="popup view-category">
          <div className="popup-head">
            <h4>View Category</h4>
            <div className="close" onClick={handleClose}>
              <GrFormClose size="2rem" color="#fff" />
            </div>
          </div>

          <div className="popup-body">
            {viewloading ? (
              "Loading..."
            ) : (
              <table className="uk-table uk-table-striped uk-table-hover">
                <tbody>
                  {viewList.map((props) => {
                    const { title, body, id } = props;
                    return (
                      <tr key={id}>
                        <td
                          className="uk-text-bold"
                          style={{ fontSize: "14px", color: "#000" }}
                        >
                          {title}
                        </td>
                        <td
                          style={{
                            borderLeft: "1px solid rgb(225, 226, 227)",
                          }}
                        >
                          {body}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          <div className="popup-footer">
            <button className="btn btn-cancel" onClick={handleClose}>
              <span>Exit</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewCategoryPop;
