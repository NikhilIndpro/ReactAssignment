import api from '../../../api';
import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  requestListSuccess,
  requestListError,
  requestList,
  FETCHED_LIST,
} from './actions';

function* watchFetchList() {
  yield takeLatest(FETCHED_LIST, getListAsync);
}

function* getListAsync(acton) {
  try {
    yield put(requestList());
    const data = yield call(
      api.get,
      'https://jsonplaceholder.typicode.com/photos',
    );
    yield put(requestListSuccess(data));
  } catch (error) {
    yield put(requestListError());
    console.log(error);
  }
}

export default function* homePageRootSaga() {
  yield all([watchFetchList()]);
}
