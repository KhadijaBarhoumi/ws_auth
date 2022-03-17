import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_SUCCESS,
  USER_FAIL,
  LOGOUT,
} from "../Actionstypes/userConsts";

const intialState = {
  loading: false,
  currentUser: {},
  errors: null,
};
export const userReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return { ...state, loading: true };
    case REGISTER_SUCCESS:
      return { ...state, currentUser: payload, loading: false };
    case REGISTER_FAIL:
      return { ...state, errors: payload, loading: false };
    case LOGIN_SUCCESS:
      localStorage.setItem("token",payload.token)
          return { ...state, currentUser: payload.user, loading: false };
    case LOGIN_FAIL:
      return { ...state, errors: payload, loading: false };
      case USER_SUCCESS:
            return { ...state, currentUser: payload, loading: false };
      case USER_FAIL:
        return { ...state, errors: payload, loading: false };
        case LOGOUT:
localStorage.removeItem("token")
        return { loading: false,
          currentUser: {},
          errors: null}
    default:
      return state;
  }
};
