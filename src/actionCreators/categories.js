import axios from "axios";
const ROOT_URL = "https://backendapi.turing.com";

const headers = {
  "Content-Type": "application/json",
  accessToken: localStorage.getItem("accessToken")
};

export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR";

export const FETCH_CATEGORY_REQUEST = "FETCH_CATEGORY_REQUEST";
export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS";
export const FETCH_CATEGORY_ERROR = "FETCH_CATEGORY_ERROR";

export const fetchCategories = () => async dispatch => {
  try {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    const request = await axios.get(`${ROOT_URL}/categories`, {
      headers
    });
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: request.data
    });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_ERROR, payload: error, error: true });
  }
};

export const fetchCategory = id => async dispatch => {
  try {
    dispatch({ type: FETCH_CATEGORY_REQUEST });
    const request = await axios.get(`${ROOT_URL}/categories/${id}`, {
      headers
    });
    dispatch({
      type: FETCH_CATEGORY_SUCCESS,
      payload: request.data
    });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORY_ERROR, payload: error, error: true });
  }
};