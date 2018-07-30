import * as types from "../../constants/action_types";
const initState = {
  changePwDone: false,
  changePwing: false,
  changePwError: false
};

export default function (state = initState, action = {}) {
  switch (action.type) {
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePwDone: true,
        changePwing: initState.changePwing,
        changePwError: initState.changePwError,
        action
      };
    case types.CHANGE_PASSWORD_EROR:
      return {
        ...state,
        changePwDone: initState.changePwDone,
        changePwing: initState.changePwing,
        changePwError: true,
        action
      };
    case types.CHANGE_PASSWORD:
      return {
        ...state,
        action
      };
    case types.CHANGE_PASSWORDG:
      return {
        ...state,
        changePwDone: initState.changePwDone,
        changePwing: true,
        changePwError: initState.changePwError,
        action
      };
    case types.CHANGE_PASSWORD_RESET:
      return {
        ...state,
        changePwDone: initState.changePwDone,
        changePwing: initState.changePwDone,
        changePwError: initState.changePwError,
        action
      };

    default:
      return state;
  }
}
