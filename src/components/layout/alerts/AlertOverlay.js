import React, { Component } from "react";
import Alert from "./Alert";
import { addAlert } from "../../../actions/alertActions";
import { connect } from "react-redux";

class AlertOverlay extends Component {
    state = {
        alertList: [],
        maxAlerts: 3
    };

    onCloseClick = id => {
        this.setState({
            alertList: this.state.alertList.filter(alert => {
                return alert.id !== id;
            })
        });
    };

    componentDidUpdate(prevProps) {
        const { alertList, maxAlerts } = this.state;
        const { alert } = this.props;
        if (alert && alert.id !== prevProps.alert.id) {
            if (alertList.length >= maxAlerts) {
                this.setState({
                    alertList: [...alertList.slice(-maxAlerts + 1), alert]
                });
            } else {
                this.setState({ alertList: [...alertList, alert] });
            }
        }
    }

    render() {
        const { alertList } = this.state;
        return (
            <div className="" style={overlayStyle}>
                {alertList
                    ? alertList.map(alert => {
                          return (
                              <Alert
                                  key={alert.id}
                                  id={alert.id}
                                  message={alert.message}
                                  messageType={alert.messageType}
                                  onCloseClick={this.onCloseClick}
                              />
                          );
                      })
                    : null}
            </div>
        );
    }
}

const overlayStyle = {
    position: "absolute",
    zIndex: "10",
    top: "15%",
    left: "50%",
    transform: "translate(-50%, -50%)"
};

export default connect(
    (state, props) => ({
        alert: state.alert
    }),
    { addAlert }
)(AlertOverlay);
