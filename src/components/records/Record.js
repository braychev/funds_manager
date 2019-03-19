import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

class Record extends Component {
    render() {
        const { record } = this.props;
        return (
            <React.Fragment>
                <tr key={record.id}>
                    <td
                        className={classnames({
                            "text-info": record.type === "owed"
                        })}
                    >
                        {record.entry}
                    </td>
                    <td
                        className={classnames(
                            {
                                "text-info": record.type === "owed"
                            },
                            "d-none",
                            "d-sm-table-cell"
                        )}
                    >
                        {record.category}
                    </td>
                    <td
                        className={classnames({
                            "text-success": record.value >= 0,
                            "text-danger": record.value < 0
                        })}
                    >
                        {parseFloat(record.value).toFixed(2)}
                    </td>
                    <td>
                        {record.type === "owed" ? (
                            <span className="text-info">Owed</span>
                        ) : (
                            <span>
                                {record.dateCreated.dd}/
                                {record.dateCreated.month.substr(0, 3)}
                                <span className="d-none d-sm-inline">
                                    /{record.dateCreated.yyyy}
                                </span>
                            </span>
                        )}
                    </td>
                    <td>
                        <Link
                            to={`/record/${record.id}`}
                            className="btn btn-secondary btn-sm"
                        >
                            <i className="far fa-question-circle" />
                            <span className="d-none d-sm-inline"> Details</span>
                        </Link>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default Record;
