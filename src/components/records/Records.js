import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class Records extends Component {
    state = {
        balance: null
    };

    static getDerivedStateFromProps(props, state) {
        const { records, auth } = props;

        if (records) {
            const myRecords = records.filter(record => {
                return record.userID === auth.uid;
            });

            // Add balance
            const total = myRecords.reduce((currentValue, record) => {
                return (currentValue += parseFloat(record.value));
            }, 0);
            return { balance: total };
        }

        return null;
    }

    render() {
        const { records, auth } = this.props;
        const { balance } = this.state;

        if (records) {
            const myRecords = records
                .filter(record => {
                    return record.userID === auth.uid;
                })
                .sort((a, b) => {
                    a = new Date(a.dateCreated.fullDate);
                    b = new Date(b.dateCreated.fullDate);
                    return a > b ? -1 : a < b ? 1 : 0;
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
                    <table className="table table-striped">
                        <thead className="thead-inverse">
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
                        <tbody>
                            {myRecords.map(record => (
                                <tr key={record.id}>
                                    <td>{record.entry}</td>
                                    <td className="d-none d-sm-table-cell">
                                        {record.category}
                                    </td>
                                    <td
                                        className={classnames({
                                            "text-success": record.value >= 0,
                                            "text-danger": record.value < 0
                                        })}
                                    >
                                        {parseFloat(record.value).toFixed(2)}
                                    </td>
                                    <td>
                                        {record.dateCreated.dd}/
                                        {record.dateCreated.month.substr(0, 3)}
                                        <span className="d-none d-sm-inline">
                                            /{record.dateCreated.yyyy}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/record/${record.id}`}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            <i className="far fa-question-circle" />
                                            <span className="d-none d-sm-inline">
                                                {" "}
                                                Details
                                            </span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
