import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import noPowerHere from "../layout/noPowerHere.webp";

class EditRecord extends Component {
    constructor(props) {
        super(props);
        // Create refs
        this.entryInput = React.createRef();
        this.categoryInput = React.createRef();
        this.valueInput = React.createRef();
        this.detailsInput = React.createRef();
    }

    onSubmit = e => {
        e.preventDefault();

        const { record, firestore, history } = this.props;

        // Updated Record
        const updRecord = {
            entry: this.entryInput.current.value,
            category: this.categoryInput.current.value,
            value:
                this.valueInput.current.value === ""
                    ? 0
                    : this.valueInput.current.value,
            details: this.detailsInput.current.value
        };

        // Update record in firestore
        firestore
            .update({ collection: "records", doc: record.id }, updRecord)
            .then(history.push("/"));
    };

    render() {
        const { record, auth } = this.props;

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
                    </div>
                    {auth.uid === record.userID ? (
                        <div className="card">
                            <div className="card-header">Edit Record</div>
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
                                            ref={this.entryInput}
                                            defaultValue={record.entry}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="entry">Category</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="category"
                                            ref={this.categoryInput}
                                            defaultValue={record.category}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="entry">Value</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="value"
                                            required
                                            ref={this.valueInput}
                                            defaultValue={record.value}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="details">Details</label>
                                        <input
                                            type="textarea"
                                            className="form-control"
                                            name="details"
                                            ref={this.detailsInput}
                                            defaultValue={record.details}
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

EditRecord.propTypes = {
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
)(EditRecord);
