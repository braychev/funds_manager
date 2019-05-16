import { ADD_ALERT, REMOVE_ALERT } from "./types";

export const addAlert = (message, messageType) => {
    return {
        type: ADD_ALERT,
        message,
        messageType
    };
};

export const removeAlert = id => {
    return {
        type: REMOVE_ALERT,
        id
    };
};
