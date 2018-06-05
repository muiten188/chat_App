import * as types from "../../constants/action_types";
import { FETCH_CATCH } from "../../constants/action_types";
import { ActionConst } from 'react-native-router-flux';
const initState = {

};

export default function(state = initState, action = {}) {

  switch (action.type) {
    case ActionConst.FOCUS:
      return {
        ...state,
        
      };
    default:
      return state;
  }
}
