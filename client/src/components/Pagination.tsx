import { IPagination } from "../interface/IPagination";

export const Pagination = ({totalPages, currentPage, onPageChange}:IPagination) => {
  const pageNumbers = [...Array(totalPages)].map((_, index) => index + 1);

    return(
    <nav aria-label="Page navigation example" className="d-flex justify-content-center">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Previous
          </button>
        </li>

        {pageNumbers.map((pageNum) => (
          <li key={pageNum}>
            <button className="page-link" onClick={() => onPageChange(pageNum)}>
              {pageNum}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
    )
}