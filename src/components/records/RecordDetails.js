import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";
import noPowerHere from "../layout/noPowerHere.webp";
import { DATE_CREATED } from "../../constants/constants";
import ValueForm from "../layout/ValueForm";
import RecordDetailsButtonGroup from "./RecordDetailsButtonGroup";

class RecordDetails extends Component {
    state = {
        showUpdateForm: false,
        showPayForm: false,
        valueAmount: 0
    };

    onShowUpdateFormClick = () => {
        const { record } = this.props;
        this.setState({ valueAmount: parseFloat(record.value).toFixed(2) });
        this.setState({ showUpdateForm: !this.state.showUpdateForm });
    };

    onShowPayFormClick = () => {
        const { record } = this.props;
        this.setState({ valueAmount: parseFloat(record.value).toFixed(2) });
        this.setState({ showPayForm: !this.state.showPayForm });
    };

    // Update Value
    onValueUpdate = e => {
        e.preventDefault();

        const { record, firestore } = this.props;
        const { valueAmount } = this.state;

        const recordUpdate = {
            value: String(valueAmount),
            isExpense: valueAmount >= 0 ? false : true
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

        const { valueAmount } = this.state;
        const { record, firestore, history } = this.props;
        const dateCreated = DATE_CREATED();
        const newRecord = { ...record };
        delete newRecord.id;

        newRecord.value = String(valueAmount);
        newRecord.dateCreated = DATE_CREATED();
        newRecord.type = "completed";
        delete newRecord.id;

        // Create New Record
        firestore.add({ collection: "records" }, newRecord);

        // Update Current Record
        const recordUpdate = {
            dateCreated,
            value: String(parseFloat(record.value).toFixed(2) - valueAmount)
        };

        if (recordUpdate.value !== "0") {
            // Update in Firestore
            firestore.update(
                { collection: "records", doc: record.id },
                recordUpdate
            );
        } else {
            firestore
                .delete({ collection: "records", doc: record.id })
                .then(history.push("/"));
        }
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { record, auth } = this.props;
        const { showUpdateForm, showPayForm, valueAmount } = this.state;

        if (record) {
            const userIsAuthenticated =
                auth.uid === record.userID ? true : false;
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left" /> Back
                                To Dashboard
                            </Link>
                        </div>
                        {userIsAuthenticated ? (
                            <RecordDetailsButtonGroup
                                record={record}
                                showUpdateForm={showUpdateForm}
                                showPayForm={showPayForm}
                                valueAmount={valueAmount}
                                onShowPayFormClick={this.onShowPayFormClick}
                                onPayClick={this.onPayClick}
                                onDeleteClick={this.onDeleteClick}
                                onChange={this.onChange}
                            />
                        ) : null}
                    </div>
                    <hr />
                    {userIsAuthenticated ? (
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
                                    <div className="col-md-4 col-sm-6 text-right">
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
                                                    value="showUpdateForm"
                                                    onClick={
                                                        this
                                                            .onShowUpdateFormClick
                                                    }
                                                >
                                                    <i className="fas fa-pencil-alt" />
                                                </a>
                                            </small>
                                        </h4>
                                        {showUpdateForm ? (
                                            <ValueForm
                                                onSubmit={this.onValueUpdate}
                                                valueAmount={valueAmount}
                                                onChange={this.onChange}
                                                buttonText="Update"
                                            />
                                        ) : null}
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
