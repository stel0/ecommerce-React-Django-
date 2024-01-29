import axios from "axios";
import { GET_CATEGORIES_FAIL, GET_CATEGORIES_SUCCESS } from "./types";

export const get_categories = () => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/category/categories/`,
            config
        );
        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: res.data,
        });
        console.log(res)
    } catch (error) {
        dispatch({
            type: GET_CATEGORIES_FAIL,
        });
        console.log(error)
    }
}