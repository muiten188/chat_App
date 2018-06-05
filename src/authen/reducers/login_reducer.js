import * as types from "../../store/constants/action_types";
const initState = {
  Logged: null,
  Loging: false,
  logout: false,
  userForm: null,
  user: {},
  authen_expri: false
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        Logged: action.Logged,
        user: action.user,
        Loging: false,
        Logout: initState.logout,
        action
      };
    case types.LOGIN_EROR:
      return {
        ...state,
        Logged: action.Logged,
        Loging: false,
        Logout: initState.logout,
        action
      };
    case types.LOGIN:
      return {
        ...state,
        Loging: action.Loging,
        Logout: initState.logout,
        action
      };
    case types.LOGGED_OUT:
      return {
        ...state,
        Logged: null,
        Loging: false,
        Logout: true,
        authen_expri: initState.authen_expri,
        action
      };
    case types.EXPORT_FORM:
      return {
        ...state,
        userForm: action.userForm,
        action
      };
    case types.AUTHEN_EXPRI: {
      return {
        ...state,
        Logged: null,
        Loging: false,
        Logout: true,
        authen_expri:true,
        action
      };
    }
    default:
      return state;
  }
}
