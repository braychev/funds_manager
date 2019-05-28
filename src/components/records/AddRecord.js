import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import BackToDashboard from "../layout/BackToDashboard";
import { DATE_CREATED } from "../../constants/constants";

class AddRecord extends Component {
    state = {
        record: {
            entry: "",
            category: "",
            excludeStatistics: true,
            isExpense: true,
            userID: "",
            value: "",
            dateCreated: {
                fullDate: "",
                day: "",
                month: "",
                dd: "",
                mm: "",
                yyyy: "",
                hour: "",
                minute: ""
            },
            details: "",
            type: "completed"
        },
        duplicateValue: false
    };

    onSubmit = e => {
        e.preventDefault();

        const newRecord = this.state.record;
        const { duplicateValue } = this.state;

        const { firestore, history, auth } = this.props;

        newRecord.userID = auth.uid;
        newRecord.dateCreated = DATE_CREATED();

        if (newRecord.value >= 0) {
            newRecord.isExpense = false;
        }

        firestore
            .add({ collection: "records" }, newRecord)
            .then(() => history.push("/"));

        if (newRecord.type === "owed" && duplicateValue === true) {
            newRecord.type = "completed";
            newRecord.value = String(newRecord.value * -1);
            firestore.add({ collection: "records" }, newRecord);
        }
    };

    onChange = e => {
        this.setState({
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        });
    };

    onRecordChange = e => {
        this.setState({
            record: {
                ...this.state.record,
                [e.target.name]:
                    e.target.type === "checkbox"
                        ? e.target.checked
                        : e.target.value
            }
        });
    };

    render() {
        const { record, duplicateValue } = this.state;
        return (
            <div>
                <BackToDashboard />
                <div className="card">
                    <div className="card-header">Add Record</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="entry">Entry</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="entry"
                                    minLength="2"
                                    required
                                    onChange={this.onRecordChange}
                                    value={record.entry}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    onChange={this.onRecordChange}
                                    value={record.category}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="value">Value</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="value"
                                    required
                                    onChange={this.onRecordChange}
                                    value={record.value}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="details">Details</label>
                                <input
                                    type="textarea"
                                    className="form-control"
                                    name="details"
                                    onChange={this.onRecordChange}
                                    value={record.details}
                                />
                            </div>
                            <p>Record Type</p>
                            <div className="form-row align-items-center">
                                <div className="form-check form-check-inline col-auto">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="recordType0"
                                        value="completed"
                                        onChange={this.onRecordChange}
                                        defaultChecked
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="recordType0"
                                    >
                                        Completed
                                    </label>
                                </div>
                                <div className="form-check form-check-inline col-auto">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="recordType1"
                                        value="owed"
                                        onChange={this.onRecordChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="recordType1"
                                    >
                                        Owed
                                    </label>
                                </div>
                                <div className="form-check form-check-inline col-auto">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="recordType2"
                                        value="monthly"
                                        onChange={this.onRecordChange}
                                        disabled
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="recordType2"
                                    >
                                        Monthly (WIP)
                                    </label>
                                </div>
                            </div>
                            {record.type === "owed" ? (
                                <div className="form-check">
                                    <hr />
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="duplicateValue"
                                        checked={duplicateValue}
                                        id="duplicateCheck"
                                        onChange={this.onChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="duplicateCheck"
                                    >
                                        Duplicate Payment
                                    </label>
                                    <hr />
                                </div>
                            ) : null}
                            <br />
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-primary btn-block"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

AddRecord.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(),
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(AddRecord);
