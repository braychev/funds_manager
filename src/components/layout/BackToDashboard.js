import React from "react";
import { Link } from "react-router-dom";

export default () => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-6">
                    <Link to="/" className="btn btn-link">
                        <i className="fas fa-arrow-circle-left" /> Back To
                        Dashboard
                    </Link>
                </div>
            </div>
            <hr />
        </React.Fragment>
    );
};
