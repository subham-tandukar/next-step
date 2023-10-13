import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section class="error-404 not-found section-b">
      <span class="error-watermark">404</span>
      <h2 class="error-title">Page not found</h2>
      <p class="error-text">Oops! That page can't be found.</p>
      <div className="mt-30">
        <Link className="btn" to="/">
          <span>Go to home</span>
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
