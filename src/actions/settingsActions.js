import { CHANGE_LOCAL_SETTINGS } from "./types";

export const changeLocalSettings = localSettings => {
    // Get settings from localStorage
    const settings = JSON.parse(localStorage.getItem("settings"));

    // Change settings
    settings.recordsPerPage = localSettings.recordsPerPage;
    settings.paginationType = localSettings.paginationType;
    settings.paginationLocation = localSettings.paginationLocation;

    // Set back to localStorage
    localStorage.setItem("settings", JSON.stringify(settings));

    return {
        type: CHANGE_LOCAL_SETTINGS,
        payload: localSettings
    };
};
