import { AsyncStorage } from "react-native";

import * as types from "../../store/constants/action_types";
import * as AppConfig from "../../config/app_config";
import { Actions } from 'react-native-router-flux';
export function login(user) {
  
  return dispatch => {
    dispatch(_login(true, user));
    Actions.home()
    //dispatch(_loging());
    // AsyncStorage.setItem("@userLogin", JSON.stringify(user));
    // fetch(`${AppConfig.API_HOST}mobile/authen/login`, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json, text/plain, */*",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(user)
    // })
    //   .then(function(response) {
    //     if (response.status != 200) {
    //       dispatch(_login(false));
    //     } else {
    //       return response.json();
    //     }
    //   })
    //   .then(function(responseJson) {
    //     if (responseJson && responseJson.username) {
    //       user = responseJson;
    //       dispatch(_login(true, user));
    //     }
    //   })
    //   .catch(function(error) {
    //     dispatch(_login(false));
    //   });
  };
}

export function setFormLogin(userForm) {
  return {
    type: types.EXPORT_FORM,
    userForm: userForm
  };
}

export function _loging() {
  return {
    type: types.LOGIN,
    Loging: true
  };
}

export function _login(status, user) {
  if (status) {
    return {
      type: types.LOGIN_SUCCESS,
      user: user,
      Logged: status
    };
  } else {
    return {
      type: types.LOGIN_EROR,
      Logged: status
    };
  }
}

export function setUser(user) {
  return dispatch => {
    dispatch(_login(true, user));
  };
}

export function logout() {
  return {
    type: types.LOGGED_OUT
  };
}
