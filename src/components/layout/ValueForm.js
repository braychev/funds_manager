import React, { Component } from "react";

class ValueForm extends Component {
    render() {
        const {
            valueAmount,
            onSubmit,
            onToggleClick,
            onChange,
            buttonText
        } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <div className="input-group btn-group">
                    <input
                        type="number"
                        className="form-control"
                        name="valueAmount"
                        value={valueAmount}
                        onChange={onChange}
                    />
                    {onToggleClick ? (
                        <div className="input-group-append">
                            <button
                                type="submit"
                                value={buttonText}
                                className="btn btn-primary"
                            >
                                <i className="fas fa-check" />
                            </button>
                            <button
                                type="button"
                                onClick={onToggleClick}
                                className="btn btn-danger"
                            >
                                <i className="fas fa-times" />
                            </button>
                        </div>
                    ) : (
                        <div className="input-group-append">
                            <input
                                type="submit"
                                value={buttonText}
                                className="btn btn-primary"
                            />
                        </div>
                    )}
                </div>
            </form>
        );
    }
}

export default ValueForm;
