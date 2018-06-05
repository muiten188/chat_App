//authen
import loginReducer from "../../authen/reducers/login_reducer";
//app
import homeReducer from "../../store/reducers/containers/home_reducer";
import museumListReducer from "../../store/reducers/containers/museumList_reducer";
import findGuiderReducer from "../../store/reducers/containers/findGuider_reducer";
import profileReducer from "../../store/reducers/containers/profile_reducer";
import app_Reducer from "../../store/reducers/app_reducer";
import router_Reducer from "../../store/reducers/router/router_reducer";
import * as types from "../../store/constants/action_types";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const appReducer = combineReducers({
  loginReducer,
  homeReducer,
  museumListReducer,
  findGuiderReducer,
  profileReducer,
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