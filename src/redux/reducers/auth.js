import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATITON_SUCCESS,
  ACTIVATION_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from "../actions/types.js";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  user: null,
  loading: false,
};

export default function Auth(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SET_AUTH_LOADING:
      return{
        ...state,
        loading: true
      }
    case REMOVE_AUTH_LOADING:
      return{
        ...state,
        loading: false
      }

    case ACTIVATITON_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state,
      };
    case SIGNUP_FAIL:
    case SIGNUP_SUCCESS:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
  }
  return state;
}
