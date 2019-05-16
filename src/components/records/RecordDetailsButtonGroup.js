import React, { Component } from "react";
import { Link } from "react-router-dom";
import ValueForm from "../layout/ValueForm";

class RecordDetailsButtonGroup extends Component {
    render() {
        const {
            record,
            showPayForm,
            valueAmount,
            onChange,
            onShowPayFormClick,
            onPayClick,
            onDeleteClick
        } = this.props;
        return (
            <div className="col-md-6">
                <div className="btn-group float-right">
                    {record.type !== "completed" ? (
                        <React.Fragment>
                            {showPayForm ? (
                                <ValueForm
                                    onSubmit={onPayClick}
                                    valueAmount={valueAmount}
                                    onToggleClick={onShowPayFormClick}
                                    onChange={onChange}
                                    buttonText="Confirm"
                                />
                            ) : (
                                <button
                                    className="btn btn-success"
                                    onClick={onShowPayFormClick}
                                >
                                    {record.isExpense ? "Pay" : "Receive"}
                                </button>
                            )}
                        </React.Fragment>
                    ) : null}
                    <Link
                        to={`/record/edit/${record.id}`}
                        className="btn btn-dark"
                    >
                        Edit
                    </Link>
                    <button className="btn btn-danger" onClick={onDeleteClick}>
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

export default RecordDetailsButtonGroup;
