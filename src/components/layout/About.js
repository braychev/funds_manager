import React, { Component } from "react";
import { Link } from "react-router-dom";
import Copyright from "./Copyright";

class About extends Component {
    render() {
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
                <p className="lead">
                    This is an application I have created for myself to help me
                    keep track of my spendings and funds, but it can be used
                    freely by everyone. It is designed to be mobile friendly,
                    where a user can use it quickly on the go.
                </p>
                <br />
                <p className="lead">
                    This app features all four CRUD (Create, read, update and
                    delete) functions. It features a fully functional login
                    system, with authorisation and route protection. It is build
                    with React and uses Firebase as a database. Styling is done
                    with bootstrap.
                </p>
                <br />
                <p className="lead">
                    Current version: 1.0.3 <br />
                    Planned features for future versions:
                    <ul>
                        <li>Owed feature </li>
                        <li>Filters & Pagination </li>
                        <li>
                            Settings with a new collection (table) tied to user
                            IDs{" "}
                        </li>
                        <li>Statistics </li>
                        <li>Data Encryption </li>
                        <li>
                            Migrating the database from Firebase to MySQL or
                            MongoDB{" "}
                        </li>
                    </ul>
                </p>
                <Copyright />
            </div>
        );
    }
}

export default About;
