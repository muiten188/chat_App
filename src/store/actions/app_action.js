import * as types from "../constants/action_types";
import * as AppConfig from "../../config/app_config";
import { buildHeader, fetchCatch, _logout } from "../../helper";
let _loadPayInfoMoreCurrentPage = -1;
export function _getUser(user) {
  return {
    type: types.USER_INFO,
    user: user
  };
}

export function closePayInfo() {
  return {
    type: types.CLOSE_PAYINFO
  };
}

export function showPayInfo() {
  return {
    type: types.SHOW_PAYINFO
  };
}

export function getPayInfo(startDate, endDate, paymentMethod, user) {
  var dataPost = {
    fromDate: startDate.toISOString(),
    toDate: endDate.toISOString(),
  } || {};
  if (paymentMethod) {
    dataPost.paymentMethod = paymentMethod;
  }
  return dispatch => {
    // dispatch(_getingPayInfo());
    fetch(
      `${AppConfig.API_HOST}tablet/sumaryPayment?${getQueryString(dataPost)}`,
      {
        headers: buildHeader(user),
        method: "GET"
      }
    )
      .then(function (response) {
        if (response.status == 401) {
          dispatch(_logout());
        }
        if (response.status != 200) {
          dispatch(_listPayError());
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        if (responseJson) {
          let bill = responseJson;
          if (bill) {
            dispatch(_listPayInfo(bill));
          } else {
            dispatch(_listPayError());
          }
        }
      })
      .catch(function (error) {
        dispatch(_listPayError());
      });
  }
}

export function searchPayInfo(values, currentPage, pageSize, user) {
  _loadPayInfoMoreCurrentPage=-1;
  let data = [];
  let dataPost = values || {};
  if (!dataPost.paymentMethod || dataPost.paymentMethod == "All") {
    delete dataPost.paymentMethod;
  }
  dataPost = { ...dataPost, currentPage: 1, pageSize: pageSize };
  return dispatch => {
    //dispatch(_searching());

    fetch(`${AppConfig.API_HOST}tablet/pagingPaymentReport?${getQueryString(dataPost)}`, {
      headers: buildHeader(user),
      method: "GET",
      qs: dataPost
    })
      .then(function (response) {
        if (response.status == 401) {
          dispatch(_logout());
        } else if (response.status != 200) {
          dispatch(_seachPayInfoError());
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        if (responseJson) {
          if (responseJson.data) {
            data = responseJson.data;
            dispatch(_searchPayInfo(data, dataPost, responseJson.totalElement));
          } else {
            dispatch(_seachPayInfoError());
          }
        }
        else {
          dispatch(_seachPayInfoError());
        }
      })
      .catch(function (error) {
        dispatch(_seachPayInfoError());
      });
  };
}

function _searchPayInfo(data, valuesForm, totalElement) {
  return {
    type: types.LISTPAYINFO,
    data: data,
    isLoading: false,
    valuesForm: valuesForm,
    totalElement: totalElement
  };
}

function _seachPayInfoError() {
  return {
    type: types.SEARCH_PAYINFO_ERROR,
    isLoading: false
  };
}

export function loadPayInfoMore(values, currentPage, pageSize, user) {
  if (_loadPayInfoMoreCurrentPage == currentPage) {
    //console.log("current page return: " + currentPage)
    return {
      type: types.LISTPAYINFO_DUPLICATE,
    };
  }
  else {
    //console.log("current page continues: " + currentPage)
    _loadPayInfoMoreCurrentPage = currentPage;
  }
  let data = [];
  let dataPost = values || {};
  if (!dataPost.paymentMethod || dataPost.paymentMethod == "All") {
    delete dataPost.paymentMethod;
  }
  dataPost = { ...dataPost, currentPage: currentPage + 1, pageSize: pageSize };

  return dispatch => {
    // dispatch(_searching());
    fetch(`${AppConfig.API_HOST}tablet/pagingPaymentReport?${getQueryString(dataPost)}`, {
      headers: buildHeader(user),
      method: "GET",
      qs: dataPost
    })
      .then(function (response) {
        if (response.status == 401) {
          dispatch(_logout());
        } else if (response.status != 200) {
          dispatch(_seachPayInfoError());
        } else {
          return response.json();
        }
      })
      .then(function (responseJson) {
        if (responseJson) {
          if (responseJson.data) {
            data = responseJson.data;

            dispatch(_dataPayInfoMore(data));
          } else {
            dispatch(_seachPayInfoError());
          }
        }
        else {
          dispatch(_seachPayInfoError());
        }
      })
      .catch(function (error) {
        dispatch(_seachPayInfoError());
      });
  };
}

function _dataPayInfoMore(data) {
  return {
    type: types.SEARCH_PAYINFO_LOAD_MORE,
    data: data
  };
}


export function clearPayListError() {
  return {
    type: types.LISTPAYINFO_CLEAR_ERROR,
  };
}

export function resetState() {
  return {
    type: types.RESET_APPSTATE
  };
}

function _getingPayInfo() {
  return {
    type: types.LISTING_PAY_INFO
  };
}

function _listPayInfo(payInfo) {
  return {
    type: types.LIST_PAY_INFO,
    payInfo: payInfo,
  };
}

function _listPayError() {
  return {
    type: types.LIST_PAY_ERROR
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