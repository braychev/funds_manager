import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import {} from "../../actions/settingsActions";
import { notifyUser } from "../../actions/notifyActions";
import { changeLocalSettings } from "../../actions/settingsActions";
import Alert from "../layout/Alert";
import WIP from "../layout/WIP.png";
import Copyright from "../layout/Copyright";

class Settings extends Component {
    settings = JSON.parse(localStorage.getItem("settings"));

    state = {
        alertVisible: false,
        localSettings: {
            recordsPerPage: this.settings.recordsPerPage,
            paginationType: this.settings.paginationType,
            paginationLocation: this.settings.paginationLocation
        }
    };

    // Handle Alert
    handleAlert = timeout => {
        this.setState({ alertVisible: true });
        setTimeout(() => {
            this.setState({ alertVisible: false });
        }, timeout);
    };

    // Update Database
    onUpdateDBClick = e => {
        e.preventDefault();

        const { records, firestore, notifyUser } = this.props;

        const typeUpdate = {
            type: "completed"
        };

        // Update in Firestore
        records.forEach(record => {
            if (!record.type) {
                firestore.update(
                    { collection: "records", doc: record.id },
                    typeUpdate
                );
            }
        });
        notifyUser("Database Format Updated", "sucess");
        this.handleAlert(1500);
    };

    onChange = e => {
        this.setState({
            localSettings: {
                ...this.state.localSettings,
                [e.target.name]: e.target.value
            }
        });
    };

    onPaginationTypeChange = e => {
        this.setState({
            localSettings: {
                ...this.state.localSettings,
                paginationType: e.target.value
            }
        });
    };

    onPaginationLocationChange = e => {
        this.setState({
            localSettings: {
                ...this.state.localSettings,
                paginationLocation: e.target.value
            }
        });
    };

    onLocalSubmit = e => {
        e.preventDefault();

        const { localSettings } = this.state;
        const { notifyUser, changeLocalSettings } = this.props;

        notifyUser(`Local settings changed!`, "sucess");
        this.handleAlert(1500);
        changeLocalSettings(localSettings);
    };

    render() {
        const admins = [
            "hTBQpswEZIhpeCfxLI0f8WyF3ST2",
            "1jQSAyQIhtY3xTyg0axukMFGcjl2"
        ];
        const { auth } = this.props;
        const { message, messageType } = this.props.notify;
        const { alertVisible, localSettings } = this.state;

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
                {message && alertVisible ? (
                    <Alert message={message} messageType={messageType} />
                ) : null}
                <div>
                    <h4>Local Settings:</h4>
                    <form onSubmit={this.onLocalSubmit}>
                        <div className="form-group">
                            <label htmlFor="paginationType">
                                Pagination Type
                            </label>
                            <select
                                id="paginationType"
                                className="form-control"
                                onChange={this.onPaginationTypeChange}
                                value={localSettings.paginationType}
                            >
                                <option value="disabled">Disabled</option>
                                <option value="pages">Pages</option>
                                <option value="months">Months</option>
                            </select>
                        </div>
                        {localSettings.paginationType === "pages" ? (
                            <div className="form-group">
                                <label htmlFor="recordsPerPage">
                                    Records per page
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="recordsPerPage"
                                    min="8"
                                    onChange={this.onChange}
                                    value={localSettings.recordsPerPage}
                                />
                            </div>
                        ) : null}
                        {localSettings.paginationType !== "disabled" ? (
                            <div className="form-group">
                                <label htmlFor="paginationLocation">
                                    Pagination Location
                                </label>
                                <select
                                    id="paginationLocation"
                                    className="form-control"
                                    onChange={this.onPaginationLocationChange}
                                    value={localSettings.paginationLocation}
                                >
                                    <option value="Top">Top</option>
                                    <option value="Bottom">Bottom</option>
                                    <option value="TopBottom">
                                        Top & Bottom
                                    </option>
                                </select>
                            </div>
                        ) : null}
                        <br />
                        <div className="text-center">
                            <input
                                type="submit"
                                value="Apply"
                                className="btn btn-primary text-center"
                            />
                        </div>
                    </form>
                    <hr />
                    <h4>Account Settings:</h4>
                    <div className="text-center">
                        <img
                            src={WIP}
                            className="img-fluid"
                            alt="Work in progress!"
                        />
                    </div>
                </div>
                {admins.indexOf(auth.uid) > -1 ? (
                    <div>
                        <hr />
                        <h4>Developper Settings:</h4>
                        <div className="text-center">
                            <br />
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
    notifyUser: PropTypes.func.isRequired,
    changeLocalSettings: PropTypes.func.isRequired
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
            notifyUser,
            changeLocalSettings
        }
    )
)(Settings);
