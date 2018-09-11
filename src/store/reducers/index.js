//authen
import loginReducer from "../../authen/reducers/login_reducer";
//app
import homeReducer from "../../store/reducers/containers/home_reducer";
import chatScreenReducer from "../../store/reducers/containers/chatScreen_reducer";
import listChatReducer from "../../store/reducers/containers/listChat_reducer";
import phoneBookReducer from "../../store/reducers/containers/phoneBook_reducer";
import listGroupReducer from "../../store/reducers/containers/listGroup_reducer";
import profileReducer from "../../store/reducers/containers/profile_reducer";
import groupEditReducer from "../../store/reducers/containers/groupEdit_reducer";
import chatEditReducer from "../../store/reducers/containers/chatEdit_reducer";
import changePasswordReducer from "../../store/reducers/containers/changePassword_reducer";
import app_Reducer from "../../store/reducers/app_reducer";
import router_Reducer from "../../store/reducers/router/router_reducer";
import * as types from "../../store/constants/action_types";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const appReducer = combineReducers({
  loginReducer,
  homeReducer,
  chatScreenReducer,
  listChatReducer,
  phoneBookReducer,
  listGroupReducer,
  profileReducer,
  groupEditReducer,
  chatEditReducer,
  changePasswordReducer,
  app_Reducer,
  router_Reducer,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type === types.LOGGED_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;