import { useDispatch, useSelector } from 'react-redux';

const namespace = 'pages/homepage/';

export const REQUESTED_LIST_SUCCEEDED = `${namespace}REQUESTED_LIST_SUCCEEDED`;
export const REQUESTED_LIST = `${namespace}REQUESTED_LIST`;
export const REQUESTED_LIST_FAILED = `${namespace}REQUESTED_LIST_FAILED`;
export const FETCHED_LIST = `${namespace}FETCHED_LIST`;

export const requestList = () => {
  return { type: REQUESTED_LIST };
};

export const requestListSuccess = data => {
  return { type: REQUESTED_LIST_SUCCEEDED, data };
};

export const requestListError = () => {
  return { type: REQUESTED_LIST_FAILED };
};

export const fetchLIst = () => dispatch => {
  dispatch({ type: FETCHED_LIST });
};
