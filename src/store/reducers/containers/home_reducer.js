import * as types from "../../constants/action_types";
import { FETCH_CATCH } from "../../constants/action_types";
const initState = {
  isLoading: false,
  listResult: [{},{},{},{},{}],
  searchErorr: false,
  valuesForm: {},
  currentPage: 1,
  pageSize: 10,
  loadEnd: false
};

export default function(state = initState, action = {}) {
  switch (action.type) {
    case types.LIST_RESULT:
      return {
        ...state,
        listResult: action.data,
        isLoading: initState.isLoading,
        currentPage: initState.currentPage,
        searchErorr: initState.searchErorr,
        valuesForm: action.valuesForm,
        loadEnd: initState.loadEnd
      };
    case types.SEARCHING:
      return {
        ...state,
        isLoading: action.isLoading,
        searchErorr: initState.searchErorr
      };
    case types.SEARCH_ERROR:
      return {
        ...state,
        isLoading: action.isLoading,
        searchErorr: true
      };
    case types.FETCH_CATCH:
      return {
        ...state,
        isLoading: action.isLoading,
        searchErorr: true
      };
    case types.SEARCH_RESET:
      return {
        ...state,
        ...initState
      };
    case types.SEARCH_LOAD_MORE:
      return {
        ...state,
        listResult: [...state.listResult, ...action.data],
        loadEnd:
          action.data && action.data.length == initState.pageSize
            ? initState.loadEnd
            : true,
        isLoading: initState.isLoading,
        searchErorr: initState.searchErorr,
        currentPage: state.currentPage + 1
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
