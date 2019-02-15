import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import {} from "../../actions/settingsActions";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";
import WIP from "../layout/WIP.png";
import Copyright from "../layout/Copyright";

// import Spinner from "../layout/Spinner";

class Settings extends Component {
    // Update Database
    onUpdateDBClick = e => {
        e.preventDefault();

        const { records, firestore, notifyUser } = this.props;

        const detailsUpdate = {
            details: ""
        };

        const isOwedUpdate = {
            isOwed: false
        };

        // Update in Firestore
        records.forEach(record => {
            if (!record.details) {
                firestore.update(
                    { collection: "records", doc: record.id },
                    detailsUpdate
                );
            }
            if (!record.isOwed) {
                firestore.update(
                    { collection: "records", doc: record.id },
                    isOwedUpdate
                );
            }
        });
        notifyUser("Database Format Updated", "sucess");
    };

    render() {
        const admins = [
            "hTBQpswEZIhpeCfxLI0f8WyF3ST2",
            "1jQSAyQIhtY3xTyg0axukMFGcjl2"
        ];
        const { auth } = this.props;
        const { message, messageType } = this.props.notify;

        // const { actions } = this.props.settings;
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
                <hr />
                {message ? (
                    <Alert message={message} messageType={messageType} />
                ) : null}
                <div className="text-center">
                    <img
                        src={WIP}
                        className="img-fluid"
                        alt="Work in progress!"
                    />
                </div>
                {admins.indexOf(auth.uid) > -1 ? (
                    <div>
                        <hr />
                        <h4>Developper Settings:</h4>
                        <div className="text-center">
                            <button
                                className="btn btn-primary"
                                onClick={this.onUpdateDBClick}
                            >
                                Update Database Format
                            </button>
                        </div>
                    </div>
                ) : null}
                <Copyright />
            </div>
        );
    }
}

Settings.propTypes = {
    settings: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired
    // actions: PropTypes.func.isRequired
};

export default compose(
    firestoreConnect([{ collection: "records" }]),
    connect((state, props) => ({
        records: state.firestore.ordered.records
    })),
    firebaseConnect(),
    connect(
        (state, props) => ({
            auth: state.firebase.auth,
            settings: state.settings,
            notify: state.notify
        }),
        {
            notifyUser
        }
    )
)(Settings);
