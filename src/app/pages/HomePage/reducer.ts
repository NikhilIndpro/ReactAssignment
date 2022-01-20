import {
  REQUESTED_LIST,
  REQUESTED_LIST_SUCCEEDED,
  REQUESTED_LIST_FAILED,
} from './actions';

const initialState = {
  dndListReducer: [],
  error: '',
  loading: false,
};

const HomePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED_LIST:
      return {
        dndListReducer: [],
        loading: true,
        error: false,
      };
    case REQUESTED_LIST_SUCCEEDED:
      return {
        ...state,
        dndListReducer: action.data || [],
        loading: false,
        error: false,
      };
    case REQUESTED_LIST_FAILED:
      return {
        dndListReducer: [],
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default HomePageReducer;
