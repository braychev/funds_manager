import { ADD_ALERT, REMOVE_ALERT } from "../actions/types";
import uuid from "uuid";

export default (state = [], action) => {
    switch (action.type) {
        case ADD_ALERT:
            return {
                ...state,
                message: action.message,
                messageType: action.messageType,
                id: uuid()
            };
        case REMOVE_ALERT:
            return state.filter(alert => {
                if (alert.id === action.id) {
                    return false;
                } else {
                    return true;
                }
            });
        default:
            return state;
    }
};
