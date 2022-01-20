import { SET_TODO, SET_INPROGRESS, SET_DONE } from './actions';

const initialState = {
  Todo: [],
  In_Progress: [],
  Done: [],
};

const DragAndDropReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        Todo: action.data || [],
      };
    case SET_INPROGRESS:
      return {
        ...state,
        In_Progress: action.data || [],
      };
    case SET_DONE:
      return {
        ...state,
        Done: action.data || [],
      };
    default:
      return state;
  }
};

export default DragAndDropReducer;
