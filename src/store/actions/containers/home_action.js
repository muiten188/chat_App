import * as types from "../../constants/action_types";
import * as AppConfig from "../../../config/app_config";
import { buildHeader, fetchCatch, _logout } from "../../../helper";

export function onDisconnect() {
  return {
    type: types.SIGNALR_DISCONNECT,
  };
}

export function onReconnecting() {
  return {
    type: types.SIGNALR_RECONNECTING,
  };
}

export function onConnected(){
  return {
    type: types.SIGNALR_CONNECTED,
  };
}

export function clearError() {
  return {
    type: types.SEARCH_CLEAR_ERROR
  };
}
