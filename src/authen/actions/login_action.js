import { AsyncStorage } from "react-native";
import { Keyboard } from "react-native";
import * as types from "../../store/constants/action_types";
import * as AppConfig from "../../config/app_config";
import { Actions } from 'react-native-router-flux';
import { setAsyncStorage } from "../../helper/index";
import * as helper from '../../helper';
export function login(user) {

  return dispatch => {
    // dispatch(_login(true, user));
    // Keyboard.dismiss();
    // Actions.home()
    var oUser = user ? user : {};
    oUser.grant_type = "password";

    dispatch(_loging());
    const searchParams = Object.keys(oUser).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(oUser[key]);
    }).join('&');
    // AsyncStorage.setItem("@userLogin", JSON.stringify(user));
    fetch(`${AppConfig.API_HOST}token`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: searchParams
    })
      .then(function (response) {
        if (response.status != 200) {
          dispatch(_login(false));
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        if (responseJson) {
          user = responseJson;
          dispatch(_login(true, user));
          Keyboard.dismiss();

        }
      })
      .catch(function (error) {
        dispatch(_login(false));
      });
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
    // dispatch(_login(true, user));
    // Keyboard.dismiss();
    // Actions.home()
    var oUser = {};
    oUser.refresh_token = user.refresh_token;
    oUser.username = user.username;
    oUser.grant_type = "refresh_token";

    dispatch(_loging());
    const searchParams = Object.keys(oUser).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(oUser[key]);
    }).join('&');
    // AsyncStorage.setItem("@userLogin", JSON.stringify(user));
    fetch(`${AppConfig.API_HOST}token`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: searchParams
    })
      .then(function (response) {
        if (response.status != 200) {
          dispatch(refresh_token_fail());
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        if (responseJson) {
          user = responseJson;
          debugger;
          dispatch(_login(true, user));
        }
      })
      .catch(function (error) {
        dispatch(refresh_token_fail(false));
      });
  };


  // dispatch(_login(true, user));
}

function refresh_token_fail() {
  helper.clearAsyncStorage();
  //Actions.reset('login');
  return {
    type: types.REFRESH_TOKEN_FAIL
  };
}

export function logout() {
  helper.clearAsyncStorage();
  //Actions.reset('login');
  return {
    type: types.LOGGED_OUT
  };
}
