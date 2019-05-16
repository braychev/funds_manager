import React, { Component } from "react";
import classnames from "classnames";

class Alert extends Component {
    render() {
        const { id, message, messageType, onCloseClick } = this.props;
        return (
            <div>
                <div
                    className={classnames(
                        "alert",
                        "alert-dismissible",
                        "fade",
                        "show",
                        {
                            "alert-success": messageType === "sucess",
                            "alert-danger": messageType === "error"
                        }
                    )}
                    role="alert"
                >
                    {message}
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={e => onCloseClick(id, e)}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default Alert;
