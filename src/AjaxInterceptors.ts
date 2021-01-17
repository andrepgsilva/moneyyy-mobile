import axios from 'axios';
import ActionQueue from './utils/ActionQueue';
import { logout, toggleRefreshTokenLoading } from './store/reducers/AuthReducer';
import store from './store';
import * as RootNavigation from './utils/RootNavigation';
import * as SecureStore from 'expo-secure-store';

type Queue = {
  [index: string]: any
}

const authenticatedUser = store.getState().auth.user;

const interceptorsResponse = (response: any) => {
  return response;
};

const interceptorsError = (error: any) => {
  const originalRequest = error.config;
  const isUnauthorizedError = error.response.status === 401;
  const isNotRetryingTheRefreshTokenRequest = originalRequest.url !== '/api/auth/refresh-token';

  const isUserLoggedIn = authenticatedUser != null;

  if (isUnauthorizedError && isNotRetryingTheRefreshTokenRequest && isUserLoggedIn) {
    store.dispatch(toggleRefreshTokenLoading());

    SecureStore.getItemAsync('refresh_token')
      .then((refreshToken: any) => {
        axios.post('/api/auth/refresh-token', { refresh_token: refreshToken, device: 'mobile', email: authenticatedUser })
          .then((response) => {
            store.dispatch(toggleRefreshTokenLoading());

            console.log('eu aqui tentando refresh');

            Promise.all([
              SecureStore.setItemAsync('access_token', response.data.access_token),
              SecureStore.setItemAsync('refresh_token', response.data.refresh_token)
            ])
              .then((responsePromises) => {
                const actionsQueue: object = store.getState().queue.queue;

                refreshToken = responsePromises[1];

                for (const actionName in actionsQueue) {
                  const queueWithActions: Queue = actionsQueue;

                  const actionToCall = queueWithActions[actionName];

                  store.dispatch(actionToCall());
                  ActionQueue.deleteLastAction();
                }
              });
          })
          .catch(() => {
            console.log('Deu ruim aqui');
            store.dispatch(toggleRefreshTokenLoading());
            ActionQueue.clearQueue();
            SecureStore.setItemAsync('user', '');

            store.dispatch(logout);
            RootNavigation.navigate('Login');
          });
      });
  }

  return Promise.reject(error);
};

export {
  interceptorsResponse,
  interceptorsError
};
