import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Alert = props => {
    const { message, messageType } = props;

    return (
        <div
            className={classnames("alert", {
                "alert-success": messageType === "sucess",
                "alert-danger": messageType === "error"
            })}
            style={alertStyle}
        >
            {message}
        </div>
    );
};

const alertStyle = {};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired
};

export default Alert;
