import axios from "axios";

//action types
import { LOGIN, LOGOUT, GET_USER } from "./actionTypes";

const initialState = {
  user: {},
  loggedIn: false
};

export const login = () => {
  window.location.href = "http://localhost:4000/api/login";
};

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/getUser")
  };
}

export const logout = () => {
  return {
    type: LOGOUT,
    payload: axios.post(`/api/logout`)
  };
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN + "_FULFILLED":
      return { ...state };

    case GET_USER + "_PENDING":
      return {
        ...state
      };
    case GET_USER + "_FULFILLED":
      return {
        ...state,
        user: action.payload.data,
        loggedIn: true
      };
    case LOGOUT + "_FULFILLED":
      return { user: {}, loggedIn: false };
    default:
      return state;
  }
}
