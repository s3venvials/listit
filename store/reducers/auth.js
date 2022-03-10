import { AUTHENTICATE, LOGIN, LOGOUT, SIGNUP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  expiresIn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        expiresIn: action.expiresIn,
      };
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        expiresIn: action.expiresIn,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
