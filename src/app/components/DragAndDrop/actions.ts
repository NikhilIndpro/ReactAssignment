const namespace = 'components/DragAndDrop/';

// export const FETCH_TODO = `${namespace}FETCH_TODO`;
// export const FETCH_INPROGRESS = `${namespace}FETCH_INPROGRESS`;
// export const FETCH_DONE = `${namespace}FETCH_DONE`;

export const SET_TODO = `${namespace}SET_TODO`;
export const SET_INPROGRESS = `${namespace}SET_INPROGRESS`;
export const SET_DONE = `${namespace}SET_DONE`;

// export const fetchTodos = (data) => dispatch => {
//   dispatch({ type: FETCH_TODO, data });
// };

// export const fetchInprogress = () => dispatch => {
//   dispatch({ type: FETCH_INPROGRESS });
// };

// export const fetchDone = () => dispatch => {
//   dispatch({ type: FETCH_DONE });

export const setTodos = data => {
  return { type: SET_TODO, data };
};

export const setInprogress = data => {
  return { type: SET_INPROGRESS, data };
};

export const setDone = data => {
  return { type: SET_DONE, data };
};
