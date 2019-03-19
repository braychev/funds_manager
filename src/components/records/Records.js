import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import Record from "./Record";
import Pagination from "./Pagination";
// import classnames from "classnames";

class Records extends Component {
    state = {
        counter: {
            balance: null,
            owed: null,
            monthly: null
        },
        settings: JSON.parse(localStorage.getItem("settings")),
        currentPage: 0
    };

    static getDerivedStateFromProps(props, state) {
        const { records, auth } = props;
        const counter = {};

        if (records) {
            const myRecords = records.filter(record => {
                return record.userID === auth.uid;
            });

            // Add balance
            const balance = myRecords
                .filter(record => {
                    return record.type === "completed";
                })
                .reduce((currentValue, record) => {
                    return (currentValue += parseFloat(record.value));
                }, 0);
            counter.balance = balance;

            // Add owed
            const owed = myRecords
                .filter(record => {
                    return record.type === "owed";
                })
                .reduce((currentValue, record) => {
                    return (currentValue += parseFloat(record.value));
                }, 0);
            counter.owed = owed;

            return { counter: counter };
        }

        return null;
    }

    componentDidMount() {
        const { paginationType } = this.state.settings;
        if (paginationType === "months") {
            this.setState({ currentPage: new Date().getMonth() });
        }
    }

    // Change transaction page
    changePage = page => {
        this.setState({ currentPage: page });
    };

    changePageUp = () => {
        this.setState({ currentPage: this.state.currentPage + 1 });
    };

    changePageDown = () => {
        this.setState({ currentPage: this.state.currentPage - 1 });
    };

    renderRecords = myRecords => {
        const { currentPage } = this.state;
        const { recordsPerPage, paginationType } = this.state.settings;

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
        const { records, auth } = this.props;
        const { balance, owed } = this.state.counter;
        const { currentPage } = this.state;
        const { paginationType, paginationLocation } = this.state.settings;

        if (records) {
            const myRecords = records
                .filter(record => {
                    return record.userID === auth.uid;
                })
                .sort((a, b) => {
                    a = new Date(a.dateCreated.fullDate);
                    b = new Date(b.dateCreated.fullDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                .sort((a, b) => {
                    return a.type > b.type ? -1 : a.type < b.type ? 1 : 0;
                });

            return (
                <div>
                    <div className="row">
                        <div className="col-md-5">
                            <h2>
                                {" "}
                                <i className="fas fa-search-dollar" />
                                Transactions{" "}
                            </h2>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-right text-secondary">
                                Total:{" "}
                                <span className="text-primary">
                                    {parseFloat(balance).toFixed(2)}
                                </span>
                            </h5>
                            {owed ? (
                                <h5 className="text-right text-secondary">
                                    Owed:{" "}
                                    <span className="text-primary">
                                        {parseFloat(owed).toFixed(2)}
                                    </span>
                                </h5>
                            ) : null}
                        </div>
                        <div className="col-md-3">
                            <Link
                                to="/record/add"
                                className="btn btn-success btn-block"
                            >
                                <i className="fas fa-plus" /> New
                            </Link>
                        </div>
                    </div>
                    <br />

                    {/* Pagination */}
                    {paginationType !== "disabled" &&
                    paginationLocation !== "Bottom" ? (
                        <Pagination
                            settings={this.state.settings}
                            totalRecords={myRecords.length}
                            currentPage={currentPage}
                            changePage={this.changePage}
                            changePageDown={this.changePageDown}
                            changePageUp={this.changePageUp}
                        />
                    ) : null}

                    {/* Records Table */}
                    <table className="table table-hover">
                        <thead className="thead-inverse thead-light">
                            <tr>
                                <th>Entry</th>
                                <th className="d-none d-sm-table-cell">
                                    Category
                                </th>
                                <th>Value</th>
                                <th>Date</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>{this.renderRecords(myRecords)}</tbody>
                    </table>

                    {/* Pagination */}
                    {paginationType !== "disabled" &&
                    paginationLocation !== "Top" ? (
                        <Pagination
                            settings={this.state.settings}
                            totalRecords={myRecords.length}
                            currentPage={currentPage}
                            changePage={this.changePage}
                            changePageDown={this.changePageDown}
                            changePageUp={this.changePageUp}
                        />
                    ) : null}
                </div>
            );
        } else {
            return <Spinner />;
        }
    }
}

Records.propTypes = {
    firestore: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired,
    clients: PropTypes.array
};

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    })),
    firestoreConnect([{ collection: "records" }]),
    connect((state, props) => ({
        records: state.firestore.ordered.records
    }))
)(Records);
