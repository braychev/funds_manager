import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import Spinner from "./Spinner";
import TopRow from "./TopRow";
import Records from "../records/Records";
import Pagination from "./Pagination";

class Dashboard extends Component {
    state = {
        counter: {
            balance: null,
            owed: null,
            monthly: null
        },
        settings: JSON.parse(localStorage.getItem("settings")),
        currentPage: 0
    };

    static getDerivedStateFromProps(props, state) {
        const { records, auth } = props;
        const counter = {};

        if (records) {
            const myRecords = records.filter(record => {
                return record.userID === auth.uid;
            });

            // Add balance
            const balance = myRecords
                .filter(record => {
                    return record.type === "completed";
                })
                .reduce((currentValue, record) => {
                    return (currentValue += parseFloat(record.value));
                }, 0);
            counter.balance = balance;

            // Add owed
            const owed = myRecords
                .filter(record => {
                    return record.type === "owed";
                })
                .reduce((currentValue, record) => {
                    return (currentValue += parseFloat(record.value));
                }, 0);
            counter.owed = owed;

            return { counter: counter };
        }

        return null;
    }

    componentDidMount() {
        const { paginationType } = this.state.settings;

        // Switch to current month after loading
        if (paginationType === "months") {
            this.setState({ currentPage: new Date().getMonth() });
        }
    }

    // Change transaction page
    changePage = page => {
        this.setState({ currentPage: page });
    };

    changePageUp = () => {
        this.setState({ currentPage: this.state.currentPage + 1 });
    };

    changePageDown = () => {
        this.setState({ currentPage: this.state.currentPage - 1 });
    };

    render() {
        const { records, auth } = this.props;
        const { balance, owed } = this.state.counter;
        const { currentPage } = this.state;
        const {
            paginationType,
            paginationLocation,
            recordsPerPage
        } = this.state.settings;

        if (records) {
            // Load and sort records
            const myRecords = records
                .filter(record => {
                    return record.userID === auth.uid;
                })
                .sort((a, b) => {
                    a = new Date(a.dateCreated.fullDate);
                    b = new Date(b.dateCreated.fullDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                })
                .sort((a, b) => {
                    return a.type > b.type ? -1 : a.type < b.type ? 1 : 0;
                });

            return (
                <div>
                    <TopRow balance={balance} owed={owed} />
                    <br />

                    {/* Top Pagination Bar */}
                    {paginationType !== "disabled" &&
                    paginationLocation !== "Bottom" ? (
                        <Pagination
                            settings={this.state.settings}
                            myRecords={myRecords}
                            currentPage={currentPage}
                            changePage={this.changePage}
                            changePageDown={this.changePageDown}
                            changePageUp={this.changePageUp}
                        />
                    ) : null}

                    {/* Records Table */}
                    <Records
                        myRecords={myRecords}
                        paginationType={paginationType}
                        currentPage={currentPage}
                        recordsPerPage={recordsPerPage}
                    />

                    {/* Top Pagination Bar */}
                    {paginationType !== "disabled" &&
                    paginationLocation !== "Top" ? (
                        <Pagination
                            settings={this.state.settings}
                            myRecords={myRecords}
                            currentPage={currentPage}
                            changePage={this.changePage}
                            changePageDown={this.changePageDown}
                            changePageUp={this.changePageUp}
                        />
                    ) : null}
                </div>
            );
        } else {
            return <Spinner />;
        }
    }
}

Dashboard.propTypes = {
    firestore: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired
};

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    })),
    firestoreConnect([{ collection: "records" }]),
    connect((state, props) => ({
        records: state.firestore.ordered.records
    }))
)(Dashboard);
