import React, { Component } from "react";
import classnames from "classnames";

class Pagination extends Component {
    render() {
        const { recordsPerPage, paginationType } = this.props.settings;
        const { currentPage, totalRecords } = this.props;
        const totalPages =
            paginationType === "pages"
                ? parseInt(totalRecords / recordsPerPage + 1, 10)
                : 12;
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        return (
            <React.Fragment>
                {totalRecords > recordsPerPage ||
                paginationType === "months" ? (
                    <ul className="pagination justify-content-center">
                        <li
                            className={classnames("page-item", {
                                disabled: currentPage === 0
                            })}
                        >
                            <button
                                className="page-link"
                                onClick={this.props.changePageDown}
                                aria-label="Previous"
                            >
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        <li className="page-item active d-block d-sm-none">
                            <span className="page-link">
                                {paginationType === "months"
                                    ? months[currentPage]
                                    : currentPage + 1}
                            </span>
                        </li>
                        {Array(totalPages)
                            .fill(1)
                            .map((el, i) => (
                                <li
                                    className={classnames(
                                        "page-item d-none d-sm-block",
                                        {
                                            active: currentPage === i
                                        }
                                    )}
                                    key={i}
                                >
                                    <button
                                        className="page-link"
                                        onClick={e =>
                                            this.props.changePage(i, e)
                                        }
                                    >
                                        {paginationType === "months"
                                            ? months[i]
                                            : i + 1}
                                    </button>
                                </li>
                            ))}
                        <li
                            className={classnames("page-item", {
                                disabled: currentPage === totalPages - 1
                            })}
                        >
                            <button
                                className="page-link"
                                onClick={this.props.changePageUp}
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                ) : null}
            </React.Fragment>
        );
    }
}

export default Pagination;
