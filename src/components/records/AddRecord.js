import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";

class AddRecord extends Component {
    state = {
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
        isOwed: false
    };

    onSubmit = e => {
        e.preventDefault();

        const newRecord = this.state;
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

        const { firestore, history, auth } = this.props;

        newRecord.userID = auth.uid;
        newRecord.dateCreated.fullDate = new Date().toLocaleString();
        newRecord.dateCreated.day = week[new Date().getDay()];
        newRecord.dateCreated.month = year[new Date().getMonth()];
        newRecord.dateCreated.dd = new Date().getDate();
        newRecord.dateCreated.mm = new Date().getMonth() + 1; //January is 0
        newRecord.dateCreated.yyyy = new Date().getFullYear();
        newRecord.dateCreated.hour = new Date().getHours();
        newRecord.dateCreated.minute = new Date().getMinutes();

        if (newRecord.value > 0) {
            newRecord.isExpense = false;
        }

        firestore
            .add({ collection: "records" }, newRecord)
            .then(() => history.push("/"));
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left" /> Back To
                            Dashboard
                        </Link>
                    </div>
                </div>
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
                                    onChange={this.onChange}
                                    value={this.state.entry}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    onChange={this.onChange}
                                    value={this.state.category}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="value">Value</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="value"
                                    required
                                    onChange={this.onChange}
                                    value={this.state.value}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="details">Details</label>
                                <input
                                    type="textarea"
                                    className="form-control"
                                    name="details"
                                    onChange={this.onChange}
                                    value={this.state.details}
                                />
                            </div>
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
