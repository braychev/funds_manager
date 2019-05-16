import { CHANGE_LOCAL_SETTINGS } from "./types";

export const changeLocalSettings = localSettings => {
    return {
        type: CHANGE_LOCAL_SETTINGS,
        payload: localSettings
    };
};
