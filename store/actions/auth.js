import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_API } from "@env";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (userId, token, expiresIn) => {
  return async (dispatch) => {
    if (Date.parse(new Date()) >= Date.parse(expiresIn)) {
      logout();
    }
    dispatch({ type: AUTHENTICATE, userId, token, expiresIn });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      dispatch({
        type: SIGNUP,
      });
    } catch (error) {
      console.log(JSON.stringify(error));
      throw new Error("Something went wrong!");
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyALbrzLNFfIkJOBmr9RWerrZL-ah-hcR4E",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      dispatch({
        type: LOGIN,
        token: resData.idToken,
        userId: resData.localId,
        expiresIn: resData.expiresIn,
      });

      const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      await saveUserInfoToStorage(
        resData.idToken,
        resData.localId,
        expirationDate,
      );
    } catch (error) {
      console.log(JSON.stringify(error));
      throw new Error("Something went wrong!");
    }
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const saveUserInfoToStorage = async (token, userId, expiresIn) => {
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiresIn,
    })
  );
};
