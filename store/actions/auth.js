import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";

let timer;

export const authenticate = (userId, token, expiresIn) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiresIn));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  }
};

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyALbrzLNFfIkJOBmr9RWerrZL-ah-hcR4E",
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
      });
      const expirationDate = new Date(
        new Date().getTime() + resData.expiresIn * 1000
      );
      await saveUserInfoToStorage(
        resData.idToken,
        resData.localId,
        expirationDate
      );
      // dispatch(setLogoutTimer(parseInt(+resData.expiresIn * 1000)));
    } catch (error) {
      console.log(JSON.stringify(error));
      throw new Error("Something went wrong!");
    }
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
}

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveUserInfoToStorage = async (token, userId, expirationDate) => {
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expireDate: expirationDate.toISOString(),
    })
  );
};
