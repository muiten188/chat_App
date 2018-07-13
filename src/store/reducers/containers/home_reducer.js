import * as types from "../../constants/action_types";
import { FETCH_CATCH } from "../../constants/action_types";
const initState = {
  isLoading:false,
  signalrDisconnect:false,
  signalrReconnecting:false,
  signalrConnected:true
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.SIGNALR_DISCONNECT:
      return {
        ...state,
        signalrDisconnect: true,
        signalrReconnecting:false,
        signalrConnected:false
      };
    case types.SIGNALR_RECONNECTING:
      return {
        ...state,
        signalrDisconnect: false,
        signalrReconnecting:true,
        signalrConnected:false
      };
    case types.SIGNALR_CONNECTED:
      return {
        ...state,
        signalrDisconnect: false,
        signalrReconnecting:false,
        signalrConnected:true
      };
    case types.SEARCH_CLEAR_ERROR:
      return {
        ...state,
        searchErorr: initState.searchErorr
      };
    default:
      return state;
  }
}
