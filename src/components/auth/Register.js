import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { addAlert } from "../../actions/alertActions";

class Register extends Component {
    state = {
        email: "",
        password: "",
        password2: ""
    };

    onSubmit = e => {
        e.preventDefault();

        const { firebase, addAlert } = this.props;
        const { email, password, password2 } = this.state;

        // Register with firebase
        if (password === password2) {
            firebase.createUser({ email, password }).catch(err => {
                addAlert(err.message, "error");
            });
        } else {
            addAlert("Passwords don't match", "error");
        }
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-primary">
                                    <i className="fas fa-lock" /> Register
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password2">
                                        Repeat Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password2"
                                        required
                                        value={this.state.password2}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Register"
                                    className="btn btn-primary btn-block"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    firebase: PropTypes.object.isRequired,
    addAlert: PropTypes.func.isRequired
};

// export default firebaseConnect()(Login);
export default compose(
    firebaseConnect(),
    connect(
        (state, props) => ({
            alert: state.alert
        }),
        { addAlert }
    )
)(Register);
