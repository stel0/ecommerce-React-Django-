import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
  GET_PRODUCTS_BY_ARRIVAL_FAIL,
  GET_PRODUCTS_BY_SOLD_SUCCESS,
  GET_PRODUCTS_BY_SOLD_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAIL,
  RELATED_PRODUCTS_SUCCESS,
  RELATED_PRODUCTS_FAIL,
  FILTER_PRODUCTS_SUCCESS,
  FILTER_PRODUCTS_FAIL,
  // loading actions
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert.js";

export const get_products = () => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADING });
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/product/get-products`,
      config
    );
    if (res.status === 200) {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        dispatch({
          type: GET_PRODUCTS_FAIL,
        });
        dispatch(setAlert(error.response.data["error"], "red"));
      } else {
        dispatch({
          type: GET_PRODUCTS_FAIL,
        });
        dispatch(setAlert("Something went wrong", "red"));
      }
    } else {
      dispatch({
        type: GET_PRODUCTS_FAIL,
      });
      dispatch(setAlert("Something went wrong", "red"));
    }
  } finally {
    dispatch({ type: REMOVE_AUTH_LOADING });
  }
};

export const get_products_by_arrival = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/product/get-products?sort_by=date_created&order=desc&limit=3`
    );
    if (res.status === 200) {
      dispatch({
        type: GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        dispatch({
          type: GET_PRODUCTS_BY_ARRIVAL_FAIL,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_BY_ARRIVAL_FAIL,
        });
      }
    } else {
      dispatch({
        type: GET_PRODUCTS_BY_ARRIVAL_FAIL,
      });
    }
  }
};

export const get_products_by_sold = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/product/get-products?sort_by=sold&order=desc&limit=3`
    );
    if (res.status === 200) {
      dispatch({
        type: GET_PRODUCTS_BY_SOLD_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        dispatch({
          type: GET_PRODUCTS_BY_SOLD_FAIL,
        });
      } else {
        dispatch({
          type: GET_PRODUCTS_BY_SOLD_FAIL,
        });
      }
    } else {
      dispatch({
        type: GET_PRODUCTS_BY_SOLD_FAIL,
      });
    }
  }
};

export const get_product = (product_id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/product/products/${product_id}`,
      config
    );
    if (res.status === 200) {
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        dispatch({
          type: GET_PRODUCT_FAIL,
        });
      } else {
        dispatch({
          type: GET_PRODUCT_FAIL,
        });
      }
    } else {
      dispatch({
        type: GET_PRODUCT_FAIL,
      });
    }
  }
};

export const get_search_products =
  (category_id, search) => async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = {
      category_id,
      search,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/product/search`,
        body,
        config
      );
      console.log(res);
      if (res.status === 200) {
        dispatch({
          type: SEARCH_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        if (error.response.status === 404) {
          dispatch({
            type: SEARCH_PRODUCTS_FAIL,
          });
        } else {
          dispatch({
            type: SEARCH_PRODUCTS_FAIL,
          });
        }
      } else {
        dispatch({
          type: SEARCH_PRODUCTS_FAIL,
        });
      }
    }
  };

export const get_related_products = (product_id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/product/related/${product_id}`,
      config
    );
    if (res.status === 200) {
      dispatch({
        type: RELATED_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        dispatch({
          type: RELATED_PRODUCTS_FAIL,
        });
      } else {
        dispatch({
          type: RELATED_PRODUCTS_FAIL,
        });
      }
    } else {
      dispatch({
        type: RELATED_PRODUCTS_FAIL,
      });
    }
  }
};

export const get_filtered_products =
  (category_id, price_range, sort_by, order) => async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = {
      category_id,
      price_range,
      sort_by,
      order,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/product/by/search`,
        body,
        config
      );
      if (res.status === 200) {
        dispatch({
          type: FILTER_PRODUCTS_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          dispatch({
            type: FILTER_PRODUCTS_FAIL,
          });
        } else {
          dispatch({
            type: FILTER_PRODUCTS_FAIL,
          });
        }
      } else {
        dispatch({
          type: FILTER_PRODUCTS_FAIL,
        });
      }
    }
  };
