import { CHANGE_LOCAL_SETTINGS } from "../actions/types";

const initialState = {
    recordsPerPage: 10,
    paginationType: "disabled",
    paginationLocation: "top"
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOCAL_SETTINGS:
            return {
                ...state,
                payload: action.payload
            };

        default:
            return {
                ...state
            };
    }
}
