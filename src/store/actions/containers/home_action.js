import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import { buildHeader, fetchCatch, _logout } from "../../../helper";

export function search(values, currentPage, pageSize, user) {
  let data = [];
  let dataPost = values || {};
  dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
  return dispatch => {
    //dispatch(_searching());

    fetch(`${AppConfig.API_HOST}?${getQueryString(dataPost)}`, {
      headers: buildHeader(user),
      method: "GET",
      qs: dataPost
    })
      .then(function (response) {
        if (response.status == 401) {
          dispatch(_logout());
        } else if (response.status != 200) {
          dispatch(_seachError());
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        if (responseJson) {
          if (responseJson.data) {
            data = responseJson.data;
            dispatch(_search(data, dataPost));
          } else {
            dispatch(_seachError());
          }
        }
        else {
          dispatch(_seachError());
        }
      })
      .catch(function (error) {
        dispatch(_seachError());
      });
  };
}

function _search(data, valuesForm) {
  return {
    type: types.LIST_RESULT,
    data: data,
    isLoading: false,
    valuesForm: valuesForm
  };
}

function _searching() {
  return {
    type: types.SEARCHING,
    isLoading: true
  };
}

function _seachError() {
  return {
    type: types.SEARCH_ERROR,
    isLoading: false
  };
}

function getQueryString(params) {
  return Object.keys(params)
    .map(k => {
      if (Array.isArray(params[k])) {
        return params[k]
          .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
          .join("&");
      }

      return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
    })
    .join("&");
}

export function searchReset() {
  return {
    type: types.SEARCH_RESET
  };
}

export function loadMore(values, currentPage, pageSize, user) {
  let data = [];
  let dataPost = values || {};
  dataPost = { ...dataPost, currentPage: currentPage + 1, pageSize: pageSize };
  return dispatch => {
    // dispatch(_searching());
    fetch(`${AppConfig.API_HOST}?${getQueryString(dataPost)}`, {
      headers: buildHeader(user),
      method: "GET",
      qs: dataPost
    })
      .then(function (response) {
        if (response.status == 401) {
          dispatch(_logout());
        } else if (response.status != 200) {
          dispatch(_seachError());
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        if (responseJson) {
          if (responseJson.data) {
            data = responseJson.data;
            dispatch(_dataMore(data));
          } else {
            dispatch(_seachError());
          }
        }
      })
      .catch(function (error) {
        dispatch(_seachError());
      });
  };
}

function _dataMore(data) {
  return {
    type: types.SEARCH_LOAD_MORE,
    data: data
  };
}

export function clearError() {
  return {
    type: types.SEARCH_CLEAR_ERROR
  };
}
