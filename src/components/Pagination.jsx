
import "../assets/css/Pagination.css";

const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (



<nav aria-label="...">
  <ul className="pagination pagination-lg">
   
  {pages.map((page, index) => {
 return (
        <li key={index} className={`page-item ${page == currentPage ? "active" : ""}`}
        onClick={() => setCurrentPage(page)}>
        <span className="page-link">{page}</span>
        </li>
 )
    })}
    
  </ul>
</nav>

    );
};

export default Pagination;