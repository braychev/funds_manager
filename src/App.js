import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";

import { Provider } from "react-redux";
import store from "./store";

import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import AddRecord from "./components/records/AddRecord";
import RecordDetails from "./components/records/RecordDetails";
import EditRecord from "./components/records/EditRecord";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Settings from "./components/settings/Settings";
import About from "./components/layout/About";
import AlertOverlay from "./components/layout/alerts/AlertOverlay";

import "./App.css";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <AppNavbar />
                        <div className="container">
                            <AlertOverlay />
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    component={UserIsAuthenticated(Dashboard)}
                                />
                                <Route
                                    exact
                                    path="/record/add"
                                    component={UserIsAuthenticated(AddRecord)}
                                />
                                <Route
                                    exact
                                    path="/record/:id"
                                    component={UserIsAuthenticated(
                                        RecordDetails
                                    )}
                                />
                                <Route
                                    exact
                                    path="/record/edit/:id"
                                    component={UserIsAuthenticated(EditRecord)}
                                />
                                <Route
                                    exact
                                    path="/login"
                                    component={UserIsNotAuthenticated(Login)}
                                />
                                <Route
                                    exact
                                    path="/register"
                                    component={UserIsNotAuthenticated(Register)}
                                />
                                <Route
                                    exact
                                    path="/settings"
                                    component={UserIsAuthenticated(Settings)}
                                />
                                <Route
                                    exact
                                    path="/about"
                                    component={UserIsAuthenticated(About)}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
