import axios from "axios";

export const setAuthTokenAsHeader = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export const deleteAuthTokenAsHeader = () => {
    delete axios.defaults.headers.common["Authorization"];
};
