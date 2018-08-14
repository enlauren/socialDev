import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import authReducer from "./store/reducers/authReducer";
import errorsReducer from "./store/reducers/errorsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorsReducer
});

const initialStateFromApp = {};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialStateFromApp,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
