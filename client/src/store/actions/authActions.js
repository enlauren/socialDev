import axios from "axios";
import jwtDecode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "../types";
import { LOGOUT } from "../types";
import { setAuthTokenAsHeader, deleteAuthTokenAsHeader } from "../../utils/authTokenAsHeader";

export const registerUser = (userData, history) => {
    return dispatch => {
        axios
            .post("/api/users/register", userData)
            .then(res => history.push("/login"))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    };
};

export const loginUser = (userData, history) => {
    return dispatch => {
        axios
            .post("/api/users/login", userData)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);
                setAuthTokenAsHeader(token);
                dispatch(setCurrentUser(jwtDecode(token)));
            })
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    };
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const authCheckState = token => {
    return dispatch => {
        setAuthTokenAsHeader(token);
        dispatch(setCurrentUser(jwtDecode(token)));
    };
};

export const logoutCurrentUser = () => {
    return {
        type: LOGOUT
    };
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem("jwtToken");
        deleteAuthTokenAsHeader();
        dispatch(logoutCurrentUser());
    };
};
