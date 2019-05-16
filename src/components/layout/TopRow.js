import React, { Component } from "react";
import { Link } from "react-router-dom";

class TopRow extends Component {
    render() {
        const { balance, owed } = this.props;
        return (
            <div className="row">
                <div className="col-md-5">
                    <h2>
                        {" "}
                        <i className="fas fa-search-dollar" />
                        Transactions{" "}
                    </h2>
                </div>
                <div className="col-md-4">
                    <h5 className="text-left text-secondary">
                        Total:{" "}
                        <span className="text-primary">
                            {parseFloat(balance).toFixed(2)}
                        </span>
                    </h5>
                    {owed ? (
                        <h5 className="text-left text-secondary">
                            Owed:{" "}
                            <span className="text-primary">
                                {parseFloat(owed).toFixed(2)}
                            </span>
                        </h5>
                    ) : null}
                </div>
                <div className="col-md-3">
                    <Link
                        to="/record/add"
                        className="btn btn-success btn-block"
                    >
                        <i className="fas fa-plus" /> New
                    </Link>
                </div>
            </div>
        );
    }
}

export default TopRow;
