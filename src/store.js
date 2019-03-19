import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
    apiKey: "AIzaSyBjptYFWAt94bXgueyZ3hJkEmvElV6b8Xg",
    authDomain: "reactfundsmanager.firebaseapp.com",
    databaseURL: "https://reactfundsmanager.firebaseio.com",
    projectId: "reactfundsmanager",
    storageBucket: "reactfundsmanager.appspot.com",
    messagingSenderId: "834392281109"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
const firestoreSettings = {
    // timestampsInSnapshots: true
};
firestore.settings(firestoreSettings);
// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify: notifyReducer,
    settings: settingsReducer
});

// Check for settings in localStorage
if (localStorage.getItem("settings") == null) {
    // Default settings
    const defaultSettings = {
        recordsPerPage: 10,
        paginationType: "disabled",
        paginationLocation: "Top"
    };

    // Set to localStorage
    localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// Create store
const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase),
        compose(
            reactReduxFirebase(firebase),
            window.__REDUX_DEVTOOLS_EXTENSION__
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : f => f,
            e => e
        )
    )
);

export default store;
