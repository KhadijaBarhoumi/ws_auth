import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_SUCCESS,
  USER_FAIL,
  LOGOUT
} from "../Actionstypes/userConsts";

export const registerUser = (newUser, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const response = await axios.post(
      "http://localhost:5000/user/register",
      newUser
    );
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.newUser });
    navigate("/login");
  } catch (error) {
    console.dir(error);
    //alert(error.response.data.errors.forEach(el=>alert(el.msg)))
    dispatch({ type: REGISTER_FAIL, payload: error });
    /*if(!error.response.data.msg)
{   alert(error.response.data.msg)
}  */
  }
};
export const loginUser = (user, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const response = await axios.post("http://localhost:5000/user/login", user);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    navigate("/");
  } catch (error) {
    console.dir(error);

    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const opts = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const response = await axios.get(
      "http://localhost:5000/user/current",
      opts
    );
    dispatch({ type: USER_SUCCESS, payload: response.data.user });
  } catch (error) {
    console.dir(error);
    dispatch({ type: USER_FAIL, payload: error });
  }
};


export const logout=()=>{
    return {type:LOGOUT}
}