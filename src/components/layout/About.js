import React, { Component } from "react";
import Copyright from "./Copyright";
import BackToDashboard from "./BackToDashboard";

class About extends Component {
    render() {
        return (
            <div>
                <BackToDashboard />
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
                    Current version: <span className="text-success">1.2</span>{" "}
                </p>
                <p className="lead">
                    Latest Changes:
                    <br />
                    Major code refactoring pass and bugfixes. Some layout
                    changes. Users can now pay/receive partial sums of owed
                    funds and create completed transactions with the reversed
                    value of owed funds (useful for loans).
                    <br />
                </p>

                <ul className="lead">
                    <li>Layout changes (1.2)</li>
                    <li>Partial owed payments (1.2)</li>
                    <li>Duplicate owed value feature (1.2)</li>
                    <li>Major Code Refactoring (1.2)</li>
                    <li>Reworked Alert System (1.2)</li>
                    <li>
                        Option to toggle the pagination menu above or below of
                        the table, or show both (1.1.8)
                    </li>
                    <li>Monthly pagination support (1.1.8)</li>
                    <li>Pagination added (1.1.6)</li>
                    <li>Local Settings specific to the device (1.1.5)</li>
                    <li>Code refactoring (1.1)</li>
                    <li>Owed feature implemented (1.1)</li>
                </ul>
                <p className="lead">Planned features for future versions:</p>
                <ul className="lead">
                    <li>Gestures support to change pages for mobile devices</li>
                    <li>Monthly payments feature</li>
                    <li>Filters</li>
                    <li>
                        User Account Settings with a new database collection
                        (table) tied to it
                    </li>
                    <li>Major styling rework</li>
                    <li>Statistics </li>
                    <li>Data Encryption </li>
                    <li>
                        Migrating the database from Firebase to MySQL or MongoDB{" "}
                    </li>
                </ul>
                <Copyright />
            </div>
        );
    }
}

export default About;
