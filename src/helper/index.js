import { AsyncStorage } from "react-native";
import { Alert } from "react-native";
export function setAsyncStorage(key, value) {
  try {
    Jsovalue=JSON.stringify(value);
    AsyncStorage.setItem(key, Jsovalue);
  } catch (e) {
    alert("set error");
  }
}

export function getAsyncStorage(key, callback) {
  try {
    const value =AsyncStorage.getItem(key);
    callback(value)
  } catch (error) {
    alert(error);
    // Error retrieving data
  }
}

export function removeItem(key){
  try {
    const value =AsyncStorage.removeItem(key);
  } catch (error) {
  alert(error);
    // Error retrieving data
  }
}

export function clearAsyncStorage() {
  try {
    AsyncStorage.clear();
  } catch (e) {
    alert("clear error");
  }
}

export function buildHeader(user) {
  return {
    JSESSIONID: user.jSessionId
  };
}

export function formatDate(date) {
  // var monthNames = [
  //   "January", "February", "March",
  //   "April", "May", "June", "July",
  //   "August", "September", "October",
  //   "November", "December"
  // ];
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var day = date.getDate();
  var monthIndex = date.getMonth() + 1;
  var year = date.getFullYear();
  return hour + ":" + minutes + " - " + day + "/" + monthIndex + "/" + year;
}

function change_alias(alias) {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  str = str.replace(/ + /g, " ");
  str = str.trim();
  return str;
}

export function cloneObj(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}