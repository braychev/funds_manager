import React, { Component } from "react";
import PropTypes from "prop-types";
import Record from "./Record";

class Records extends Component {
    renderRecords = myRecords => {
        const { currentPage, recordsPerPage, paginationType } = this.props;
        switch (paginationType) {
            case "pages":
                return myRecords
                    .splice(currentPage * recordsPerPage, recordsPerPage)
                    .map(record => <Record key={record.id} record={record} />);
            case "months":
                return myRecords
                    .filter(record => {
                        return (
                            record.dateCreated.mm === currentPage + 1 ||
                            record.type !== "completed"
                        );
                    })
                    .map(record => <Record key={record.id} record={record} />);
            case "disabled":
                return myRecords.map(record => (
                    <Record key={record.id} record={record} />
                ));
            default:
                return myRecords.map(record => (
                    <Record key={record.id} record={record} />
                ));
        }
    };

    render() {
        const { myRecords } = this.props;

        return (
            <table className="table table-hover">
                <thead className="thead-inverse thead-light">
                    <tr>
                        <th>Entry</th>
                        <th className="d-none d-sm-table-cell">Category</th>
                        <th>Value</th>
                        <th>Date</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{this.renderRecords(myRecords)}</tbody>
            </table>
        );
    }
}

Records.propTypes = {
    myRecords: PropTypes.array.isRequired
};

export default Records;
