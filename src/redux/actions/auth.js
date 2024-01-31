import axios from "axios";

import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  ACTIVATITON_SUCCESS,
  ACTIVATION_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  // loading actions
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from "./types.js";
import { setAlert } from "./alert.js";

export const check_authenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      token: localStorage.getItem("access"),
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );
      if (res.status === 200) {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (error) {}
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const refresh = () => async (dispatch) => {
  if (localStorage.getItem("refresh")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      token: localStorage.getItem("refresh"),
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`,
        body,
        config
      );
      if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: REFRESH_FAIL,
        });
      }
    } catch (error) {}
  } else {
    dispatch({
      type: REFRESH_FAIL,
    });
  }
};

export const reset_password = (email) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
      body,
      config
    );

    if (res.status === 204) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert("Password reset email sent", "green"));
    } else {
      dispatch({
        type: RESET_PASSWORD_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert("Error sending password reset email", "red"));
    }
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    dispatch(setAlert("Error sending password reset email", "red"));
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    dispatch({ type: SET_AUTH_LOADING });
    if (new_password !== re_new_password) {
      dispatch({
        type: RESET_PASSWORD_CONFIRM_FAIL,
      });
      dispatch(setAlert("Passwords do not match", "red"));
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password,
      });
      console.log(body);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
          config,
          body
        );
        if (res.status === 204) {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
          });
          dispatch(setAlert("Password changed successfully", "green"));
        } else {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL,
          });
          dispatch(setAlert("Error changing password", "red"));
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIL,
        });
        dispatch(setAlert("Error changing password", "red"));
      }
      dispatch({ type: REMOVE_AUTH_LOADING });
    }
  };

export const signup =
  (first_name, last_name, email, password, re_password) => async (dispatch) => {
    dispatch({ type: SET_AUTH_LOADING });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/`,
        body,
        config
      );
      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
        dispatch(
          setAlert(
            "Te enviamos un correo,por favor activa tu cuenta. Revisa el correo de spam",
            "green"
          )
        );
      } else {
        dispatch({
          type: SIGNUP_FAIL,
        });
        dispatch(setAlert("Error al crear la cuenta", "red"));
      }
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
      dispatch(
        setAlert("Error conectando con el servidor, intentalo mas tarde", "red")
      );
    }
    dispatch({ type: REMOVE_AUTH_LOADING });
  };

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: USER_LOADED_FAIL });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: USER_LOADED_FAIL });
    }
  } else {
    dispatch({ type: USER_LOADED_FAIL });
  }
};

export const activate = (uid, token) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    uid,
    token,
  });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );
    if (res.status === 204) {
      dispatch({
        type: ACTIVATITON_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert("Cuenta activada", "green"));
    } else {
      dispatch({
        type: ACTIVATION_FAIL,
      });
      dispatch(setAlert("Error al activar la cuenta", "red"));
    }
  } catch (error) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
    dispatch(
      setAlert("Error al conectar con el servidor, intentalo mas tarde", "red")
    );
  }
  dispatch({ type: REMOVE_AUTH_LOADING });
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );
    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(load_user());
      dispatch(setAlert("Credenciales correctas", "green"));
      return res.status;
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL,
    });

    if (error.response) {
      if (error.response.status === 401) {
        dispatch(setAlert("Credenciales incorrectas", "red"));
      } else {
        dispatch(setAlert("Error en la autenticación", "red"));
      }
      return error.response.status;
    } else {
      dispatch(
        setAlert(
          "Error al conectar con el servidor, inténtalo más tarde",
          "red"
        )
      );
      return 500; // Default status for other types of errors
    }
  } finally {
    dispatch({ type: REMOVE_AUTH_LOADING });
  }
};

export const signout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(setAlert("Successfully logged out", "green"));
};
