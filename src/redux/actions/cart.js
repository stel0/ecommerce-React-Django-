import axios from "axios";
import {
  ADD_ITEM,
  GET_TOTAL,
  GET_ITEM_TOTAL,
  GET_ITEMS,
  UPDATE_ITEM,
  REMOVE_ITEM,
  EMPTY_CART,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  GET_TOTAL_SUCCESS,
  GET_TOTAL_FAIL,
  GET_ITEM_TOTAL_SUCCESS,
  GET_ITEM_TOTAL_FAIL,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAIL,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAIL,
  EMPTY_CART_SUCCESS,
  EMPTY_CART_FAIL,
  SYNCH_CART_SUCCESS,
  SYNCH_CART_FAIL,
} from "./types";

export const add_item = (product) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    const product_id = product.id;
    const body = JSON.stringify({
      product_id,
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cart/add-item`,
        body,
        config
      );
      if (res.status === 201) {
        dispatch({
          type: ADD_ITEM_SUCCESS,
        });
      } else {
        dispatch({
          type: ADD_ITEM_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: ADD_ITEM_FAIL,
      });
    }
  } else {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    let shouldAddItem = true;

    //check if item is already in cart
    cart.map((item) => {
      if (product.id.toString() === item.product.id.toString()) {
        shouldAddItem = false;
      }
    });

    const order_item = {
      product: product,
      count: 1,
    };

    if (shouldAddItem) {
      cart.push(order_item);
      dispatch({
        type: ADD_ITEM,
        payload: cart,
      });
    }
  }
};

export const get_items = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/cart/cart-items`,
        config
      );
      if (res.status === 200) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ITEMS_FAIL,
      });
    }
  } else {
    if (localStorage.getItem("cart")) {
      dispatch({
        type: GET_ITEMS,
        payload: JSON.parse(localStorage.getItem("cart")),
      });
    }
  }
};

export const get_total = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/cart/get-total`,
        config
      );
      if (res.status === 200) {
        dispatch({
          type: GET_TOTAL_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_TOTAL_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_TOTAL_FAIL,
      });
    }
  } else {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      let total = 0.0;
      let compare_total = 0.0;
      cart.map((item) => {
        total += parseFloat(item.count) * parseFloat(item.product.price);
        compare_total +=
          parseFloat(item.count) * parseFloat(item.product.compare_price);
      });
      dispatch({
        type: GET_TOTAL,
        payload: [
          parseFloat(total.toFixed(2)),
          parseFloat(compare_total.toFixed(2)),
        ],
      });
    }
  }
};

export const get_total_items = () => async (dispatch) => {
    if(localStorage.getItem("access")){
        
    }
}