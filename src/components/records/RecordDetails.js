import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";
import noPowerHere from "../layout/noPowerHere.webp";

class RecordDetails extends Component {
    state = {
        showValueUpdate: false,
        valueUpdateAmount: ""
    };

    // Update Value
    valueSubmit = e => {
        e.preventDefault();

        const { record, firestore } = this.props;
        const { valueUpdateAmount } = this.state;

        const recordUpdate = {
            value: parseFloat(valueUpdateAmount)
        };

        // Update in Firestore
        firestore.update(
            { collection: "records", doc: record.id },
            recordUpdate
        );
    };

    // Delete Record
    onDeleteClick = () => {
        const { record, firestore, history } = this.props;

        firestore
            .delete({ collection: "records", doc: record.id })
            .then(history.push("/"));
    };

    // Pay Owed Record
    onPayClick = e => {
        e.preventDefault();

        const { record, firestore } = this.props;

        const week = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        const year = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const dateCreated = {
            fullDate: new Date().toLocaleString(),
            day: week[new Date().getDay()],
            month: year[new Date().getMonth()],
            dd: new Date().getDate(),
            mm: new Date().getMonth() + 1,
            yyyy: new Date().getFullYear(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes()
        };

        const recordUpdate = {
            type: "completed",
            dateCreated
        };

        // Update in Firestore
        firestore.update(
            { collection: "records", doc: record.id },
            recordUpdate
        );
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { record, auth } = this.props;
        const { showValueUpdate, valueUpdateAmount } = this.state;

        let valueForm = "";
        // If value form should display
        if (showValueUpdate) {
            valueForm = (
                <form onSubmit={this.valueSubmit}>
                    <div className="input-group">
                        <input
                            type="number"
                            className="form-control"
                            name="valueUpdateAmount"
                            placeholder="New Value"
                            value={valueUpdateAmount}
                            onChange={this.onChange}
                        />
                        <div className="input-group-append">
                            <input
                                type="submit"
                                value="Update"
                                className="btn btn-outline-dark"
                            />
                        </div>
                    </div>
                </form>
            );
        } else {
            valueForm = null;
        }

        if (record) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left" /> Back
                                To Dashboard
                            </Link>
                        </div>
                        {auth.uid === record.userID ? (
                            <div className="col-md-6">
                                <div className="btn-group float-right">
                                    {record.type !== "completed" ? (
                                        <button
                                            className="btn btn-success"
                                            onClick={this.onPayClick}
                                        >
                                            Pay
                                        </button>
                                    ) : null}
                                    <Link
                                        to={`/record/edit/${record.id}`}
                                        className="btn btn-dark"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={this.onDeleteClick}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <hr />
                    {auth.uid === record.userID ? (
                        <div className="card">
                            <h3 className="card-header">{record.entry}</h3>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8 col-sm-6">
                                        <h4>
                                            Record ID:{" "}
                                            <span className="text-secondary">
                                                {record.id}
                                            </span>{" "}
                                        </h4>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <h4 className="pull-right">
                                            Value:{" "}
                                            <span
                                                className={classnames({
                                                    "text-success":
                                                        record.value >= 0,
                                                    "text-danger":
                                                        record.value < 0
                                                })}
                                            >
                                                {parseFloat(
                                                    record.value
                                                ).toFixed(2)}
                                            </span>
                                            <small>
                                                {" "}
                                                <a
                                                    href="#!"
                                                    onClick={() =>
                                                        this.setState({
                                                            showValueUpdate: !this
                                                                .state
                                                                .showValueUpdate
                                                        })
                                                    }
                                                >
                                                    <i className="fas fa-pencil-alt" />
                                                </a>
                                            </small>
                                        </h4>
                                        {valueForm}
                                    </div>
                                </div>
                                <hr />
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        Category: {record.category}
                                    </li>
                                    <li className="list-group-item">
                                        Date Added: {record.dateCreated.day},{" "}
                                        {record.dateCreated.dd}/
                                        {record.dateCreated.month.substr(0, 3)}/
                                        {record.dateCreated.yyyy} at{" "}
                                        {record.dateCreated.hour}:
                                        {record.dateCreated.minute <= 9
                                            ? "0" + record.dateCreated.minute
                                            : record.dateCreated.minute}
                                    </li>
                                    {record.details ? (
                                        <li className="list-group-item">
                                            Details: {record.details}
                                        </li>
                                    ) : null}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="card">
                            <h3 className="card-header">
                                You don't have access to this entry!
                            </h3>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8 col-sm-6">
                                        <h4>
                                            Record ID:{" "}
                                            <span className="text-secondary">
                                                {record.id}
                                            </span>
                                        </h4>
                                    </div>
                                    <div class="text-center">
                                        <img
                                            src={noPowerHere}
                                            className="rounded img-fluid"
                                            alt="..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        } else {
            return <Spinner />;
        }
    }
}

RecordDetails.propTypes = {
    firestore: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired
};

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    })),
    firestoreConnect(props => [
        { collection: "records", storeAs: "record", doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        record: ordered.record && ordered.record[0]
    }))
)(RecordDetails);
