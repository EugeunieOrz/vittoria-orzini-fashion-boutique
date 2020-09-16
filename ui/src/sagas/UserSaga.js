// @flow
import { call, put, take, race, all, fork, cancel, delay } from 'redux-saga/effects';
import { resetState } from 'modules/StateModule';
import { initApp, setUserInitialized } from 'modules/InitModule';
import { changeToHealthy, changeToUnhealthy } from 'modules/HealthModule';
import {
  fetchUser,
  fetchUserPending,
  fetchUserFulfilled,
  fetchUserRejected,
  signOutUser,
  resetUserState,
} from 'modules/UserModule';
import { combineSagas, handleError } from 'util/Saga';
import { getLastItem } from 'bundles/Account/modules/Wishlist/LastItemAlertModule';
import { showMsg, toggleMsg } from 'modules/MsgModule';
import AccountAPI from 'apis/AccountAPI';
import UserAPI from 'apis/UserAPI';
import { USER_DURATION } from 'config/index';

/**
 * Worker which sets the initialized state for the user.
 *
 * The app uses a loading indicator to show if the app was successfully initialized. The user is a fundamental part
 * of the initialization process, because it might have an authentication cookie set, so that it will be automatically
 * logged in. In that case, we don't want the user to see the sign-in page first for some seconds, before it switches
 * to the signed-in page.
 *
 * The initialization is fulfilled either if the user was successfully fetched or if the user was reset.
 */
export function* initUserWorker(): Generator<*, *, *> {
  while (yield take([fetchUserFulfilled().type, resetUserState().type])) {
    yield put(setUserInitialized());
  }
}

/**
 * Worker which handles the app initialization.
 *
 * The initialization process is a one-time task, therefore we register our `initUserWorker` task and cancel it
 * after it was finished.
 *
 * We do not fetch the user in this task, because it should only be fetched if the app is healthy. So we fetch the user
 * in the `handleHealthySwitchWorker` which will also be triggered by the `HealthSaga` on app initialization.
 */
export function* initAppWorker(): Generator<*, *, *> {
  const task = yield fork(initUserWorker);
  yield take(initApp().type);
  yield take(setUserInitialized);
  yield cancel(task);
}

/**
 * Handles the transition from the unhealthy to the healthy, or from the not known to the healthy state.
 *
 * This transition can either happen on app initialisation or it will be triggered by the `HealthSaga` if
 * the service recovers after it was unhealthy.
 */
export function* handleHealthySwitchWorker(): Generator<*, *, *> {
  while (yield take(changeToHealthy().type)) {
    yield put(fetchUser());
  }
}

/**
 * Handles the transition from the healthy to the unhealthy, or from the not known to the unhealthy state.
 *
 * This transition can either happen on app initialisation or it will be triggered by the `HealthSaga` if
 * the service fails after it was healthy.
 */
export function* handleUnhealthySwitchWorker(): Generator<*, *, *> {
  while (yield take(changeToUnhealthy().type)) {
    yield put(resetUserState());
  }
}

/**
 * Worker which fetches the user data from backend.
 *
 * If the user can't be fetched, it will also reset the user state.
 */
export function* fetchUserWorker(api: UserAPI, accountAPI: AccountAPI): Generator<*, *, *> {
  while (yield take(fetchUser().type)) {
    try {
      yield put(fetchUserPending());
      const response = yield call([api, api.get]);
      const user = response.details;
      yield put(fetchUserFulfilled(user));
      if(typeof user.notifications !== 'undefined' && user.notifications.length > 0) {
        var i;
        for (i = 0; i < user.notifications.length; i++) {
          if(user.notifications[i].lastItemAlert === true) {
            const response2 = yield call([accountAPI, accountAPI.checkForLastItem], user.notifications[i]);
            if(response2.description === "The item in your wishlist is the last item remained in stock.") {
              if(user.notifications[i].received === false) {
                user.notifications[i].received = true;
                user.notifications[i].received2 = false;
                user.notifications[i].stateOfProduct = "Last Item";
                const response3 = yield call([accountAPI, accountAPI.receiveLastItemAlert], user.notifications[i]);
                const usr2 = response3.details;
                yield put(fetchUserFulfilled(usr2));
                yield put(getLastItem(usr2.notifications[i]));
                yield put(showMsg("lastItemAlert2"));
                yield put(toggleMsg());
              }
            } else if(response2.description === "One more item of the selected size remained in stock.") {
              user.notifications[i].received2 = false;
              user.notifications[i].received = false;
              user.notifications[i].stateOfProduct = "Available";
              const response4 = yield call([accountAPI, accountAPI.receiveLastItemAlert], user.notifications[i]);
              const usr3 = response4.details;
              yield put(fetchUserFulfilled(usr3));
            } else if(response2.description === "This item is sold out.") {
              if(user.notifications[i].received2 === false) {
                user.notifications[i].received = false;
                user.notifications[i].received2 = true;
                user.notifications[i].stateOfProduct = "Item is sold out";
                const response5 = yield call([accountAPI, accountAPI.receiveLastItemAlert], user.notifications[i]);
                const usr4 = response5.details;
                yield put(fetchUserFulfilled(usr4));
                yield put(getLastItem(usr4.notifications[i]));
                yield put(showMsg("itemOutOfStockAlert2"));
                yield put(toggleMsg());
              }
            }
          }
        }
      }
    } catch (e) {
      yield put(resetUserState());
      yield put(fetchUserRejected(e));
    }
  }
}

/**
 * Worker which fetches the user periodically.
 *
 * The user or the user state can change on the backend. So to keep the frontend up-to-date, we fetch the user
 * periodically. So we can detect if the user session has expired or if the name has changed, and so on.
 *
 * @param duration The duration after the which the user should be fetched periodically.
 */
export function* fetchUserPeriodicallyWorker(duration: number): Generator<*, *, *> {
  while (yield take(fetchUserFulfilled().type)) {
    while (true) {
      const { stop } = yield race({
        stop: take(resetUserState().type),
        tick: delay(duration),
      });

      if (stop) {
        break;
      }
      yield put(fetchUser());
    }
  }
}

/**
 * Worker which handles the sign-out process.
 */
export function* signOutUserWorker(api: UserAPI): Generator<*, *, *> {
  while (yield take(signOutUser().type)) {
    try {
      yield call([api, api.signOut]);
      yield put(resetUserState());
    } catch (e) {
      console.log(e);
      yield call(handleError, e, {
        'auth.unauthorized': () => ([
          put(resetUserState())
        ]),
      });
    }
  }
}

/**
 * Worker to reset the user state.
 */
export function* resetUserStateWorker(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(resetUserState().type);
    yield put(resetState(payload));
  }
}

export function* userSaga(api: UserAPI): Generator<*, *, *> {
  yield all(combineSagas([
    initAppWorker,
    handleHealthySwitchWorker,
    handleUnhealthySwitchWorker,
    [fetchUserWorker, api, accountAPI],
    [fetchUserPeriodicallyWorker, USER_DURATION],
    [signOutUserWorker, api],
    resetUserStateWorker,
  ]));
}

const api = new UserAPI();
const accountAPI = new AccountAPI();
export default [userSaga, api, accountAPI];
