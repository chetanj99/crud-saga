import { take, takeEvery, takeLatest, put, all, delay, fork, call } from "redux-saga/effects"

import * as types from "./actionTypes";
import { loadUsersSuccess, loadUsersError, createUserSuccess, createUserError, loadUsersStart, deleteUserSuccess, deleteUserError, updateUserError, updateUserSuccess } from "./actions";
import { loadUsersApi, ceateUserApi, deleteUserApi, updateUserApi } from "../../api/api";

function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUsersApi)
        yield delay(500)
        yield put(loadUsersSuccess(response.data))
    } catch (error) {
        yield put(loadUsersError(error.response.data))
    }
}

function* onCreateUserStartAsync({ payload }) {
    try {
        const response = yield call(ceateUserApi, payload)
        yield delay(500)
        yield put(createUserSuccess(response.data))
        yield put(loadUsersStart())
    } catch (error) {
        yield put(createUserError(error.response.data))
    }
}

function* onDeleteUserStartAsync(userId) {
    try {
        const response = yield call(deleteUserApi, userId)
        if (response.status === 200) {
            yield delay(500)
            yield put(deleteUserSuccess(userId))
            yield put(loadUsersStart())
        }
    } catch (error) {
        yield put(deleteUserError(error.response.data))
    }
}

function* onUpdateUserStartAsync({ payload }) {
    try {
        const { id, values } = payload
        const response = yield call(updateUserApi, id, values)
        yield delay(500)
        yield put(updateUserSuccess(response.data))
        yield put(loadUsersStart())
    } catch (error) {
        yield put(updateUserError(error.response.data))
    }
}

function* onLoadUsers() {
    yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync)
}
function* onCreateUser() {
    yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync)
}
function* onDeleteUser() {
    while (true) {
        const { payload: userId } = yield take(types.DELETE_USER_START)
        yield call(onDeleteUserStartAsync, userId)
    }
}

function* onUpdateUser() {
    yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync)
}

function* UserSaga() {
    yield all([
        fork(onLoadUsers),
        fork(onCreateUser),
        fork(onDeleteUser),
        fork(onUpdateUser)
    ])
}

export default UserSaga;
