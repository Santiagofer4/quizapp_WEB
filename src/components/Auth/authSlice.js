import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { status } from 'utils/helpers';
import axios from 'axios';
import {
  ME_ENDPOINT,
  SCHOOL_REGISTER_ENDPOINT,
  AUTH_ENDPOINT,
  USER_REGISTER_ENDPOINT,
 
  RESTORE_ENDPOINT,
  LOGIN_ENDPOINT,
} from 'utils/endpoints';

const initialState_Auth = {
  status: status.idle,
  restore: false,
  error: null,
  user: {},
  token: null,
};

const STORE_TOKEN = 'QuizJWT';

const fakeAPICall = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        firstName: 'Erwin',
        lastName: 'Schrödinger',
        email: 'erwin@quantum.com',
        birthdate: '12-08-1887',
        cellphone: '19610104',
      });
    }, 2000);
  });

export const registerUser = createAsyncThunk(
  'user/register',
  async (payload, { dispatch }) => {
    const user_response = await axios.post(USER_REGISTER_ENDPOINT, payload);
    const { user, token } = user_response.data;
    dispatch(setToken(token)); //!no esta bien visto en bajo los ojos de la redux pipol
    return user;
  }
);

export const registerSchool = createAsyncThunk(
  'school/register',
  async (payload, { dispatch }) => {
    const school_response = await axios.post(SCHOOL_REGISTER_ENDPOINT, payload);
    const { user, token } = school_response.data;
    dispatch(setToken(token));
    return user;
  }
);

export const localLogin = createAsyncThunk(
  'auth/localLogin',
  async (payload, { dispatch }) => {
    // const userData = fakeAPICall();
    // return userData;
    const login_response = await axios.post(LOGIN_ENDPOINT, payload);
    const { user, token } = login_response.data;
    dispatch(setToken(token)); //!no esta bien visto en bajo los ojos de la redux pipol
    return user;
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (payload, thunkApi) => {
    const userData = await axios(ME_ENDPOINT);
    return userData;
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (payload, { getState, dispatch }) => {
    const state = getState();
    const { auth } = state;
    const userData = await axios.get(RESTORE_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    const { user } = userData;
    return user;
    // const userData = fakeAPICall();
    // return userData;
  },
  {
    condition: (payload, { getState }) => {
      const { auth } = getState();
      if (
        auth.status === status.pending ||
        auth.status === status.loading ||
        auth.status === status.error ||
        auth.status === status.success
      ) {
        console.log('should not run again', auth);
        return false;
      }
    },
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState_Auth,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
      window.localStorage.setItem(STORE_TOKEN, payload);
      axios.defaults.headers.common.Authorization = `Bearer ${state.token}`;
    },
    restoreToken: (state, { payload }) => {
      state.token = window.localStorage.getItem(STORE_TOKEN);
    },
    deleteToken: (state, { payload }) => {},
    logout: (state, { payload }) => {
      state.token = null;
      state.restore = false;
      state.user = {};
      state.error = null;
      state.status = status.reset;
      window.localStorage.removeItem(STORE_TOKEN);
      delete axios.defaults.headers.common.Authorization;
      window.localStorage.setItem('__logout__', Date.now());
    },
  },
  extraReducers: {
    [restoreSession.pending]: (state, { payload }) => {
      state.status = status.pending;
    },
    [restoreSession.fulfilled]: (state, { payload }) => {
      state.status = status.success;
      state.restore = true;
      state.user = payload;
    },
    [restoreSession.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
    [registerUser.pending]: (state, { payload }) => {
      state.status = status.pending;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.status = status.success;
      state.user = payload;
      state.restore = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
    [registerSchool.pending]: (state, { payload }) => {
      state.status = status.pending;
    },
    [registerSchool.fulfilled]: (state, { payload }) => {
      state.status = status.success;
      state.user = payload;
      state.restore = true;
    },
    [registerSchool.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
    [localLogin.pending]: (state, { payload }) => {
      state.status = status.pending;
    },
    [localLogin.fulfilled]: (state, { payload }) => {
      state.status = status.success;
      state.user = payload;
      state.restore = true;
    },
    [localLogin.rejected]: (state, { payload }) => {
      state.status = status.error;
      state.error = payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice;
