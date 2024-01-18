import axios from "axios";

import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ACTIVATITON_SUCCESS,
  ACTIVATION_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from "./types.js";
import { setAlert } from "./alert.js";

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

export const signin = (email,password) => async dispatch => {
  dispatch({ type: SET_AUTH_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  }

  const body = JSON.stringify({
    email,
    password
  })
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`,body,config);
    if(res.status === 200){
      
    }
  } catch (error) {
    
  }
}