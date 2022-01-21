import api from '../../../api';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  requestListSuccess,
  requestListError,
  requestList,
  FETCHED_LIST,
} from './actions';

/*this function run when FETCHED_LIST is dispatch,
 second parameter of the function is the generator fuction run when FETCHED_LIST dispatch
*/

function* watchFetchList() {
  yield takeLatest(FETCHED_LIST, getListAsync);
}

function* getListAsync() {
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

//

/* RootSaga is the fuction where listner fuction is declared if 
    the listner fuction is not declare then the generator function will not get called.
*/

export default function* homePageRootSaga() {
  yield all([watchFetchList()]);
}
