import React, { useContext } from "react";
import $ from "jquery";
import { GrFormClose } from "react-icons/gr";
import BlogContext from "../../Context/blogContextFolder/blogContext";
import { FaUserCircle } from "react-icons/fa";
const ViewCommentPop = () => {
  const { commentData } = useContext(BlogContext);

  const handleClose = () => {
    $(".view-comment-bg").fadeOut(300);
    $(".view-comment").slideUp(500);
  };

  console.log("commentData", commentData);
  return (
    <>
      <section className="popup-bg view-comment-bg">
        <div className="popup view-comment">
          <div className="popup-head">
            <h4>View Comment</h4>
            <div className="close" onClick={handleClose}>
              <GrFormClose size="2rem" color="#fff" />
            </div>
          </div>

          <div className="popup-body">
            {commentData.map((props) => {
              const { _id, Name, Email, Cmt } = props;
              return (
                <div key={_id} className="cmt__pop__wrapper">
                  <div className="comment__info">
                    <div className="comment__profile">
                      <FaUserCircle size="2rem" />
                    </div>
                    <div className="comment__title">
                      <h3>{Name}</h3>
                      <span>{Email}</span>
                    </div>
                  </div>

                  <div className="comment__desc the__content">
                    <p>{Cmt}</p>
                  </div>
                </div>
              );
            })}
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

export default ViewCommentPop;
