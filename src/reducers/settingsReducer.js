// import { SETTINGACTIONS } from "../actions/types";

const initialState = {
    // Add initial settings
};

export default function(state = initialState, action) {
    switch (action.type) {
        /*
        case SETTINGACTION:
            return {
                ...state,
                settingAction: !state.settingAction
            };
         */
        default:
            return {
                ...state
            };
    }
}
