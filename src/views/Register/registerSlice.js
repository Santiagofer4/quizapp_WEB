// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {status} from '../../utils/helpers'
// // import store from '../../store/index.js'
// import  axios  from 'axios';
// // import { ACTIONS } from 'store/rootReducer';
// const initialState_user = {
//     allData: {
//       info: {},
//       token:'',
//       loginStatus:status.idle,
//       status: status.idle,
//       error: null,

//     },
//   };
  
//   export const createUser = createAsyncThunk('user/register', async (payload) => {
//     const user_response = await axios.post('http://localhost:3000/auth/register', payload);
//     // const user_response = await fetch('http://localhost:3000/auth/register',
//     //  {method:'POST', body:JSON.stringify(payload),headers:{
//     //   'Content-Type': 'application/json'
//     // }});

//     // const { token } = user_response.data;
//     // const resPayload = {
//     //   userRegister_response: user_response.data,
//     // //   formik,
//     // //   token,
//     // };
//     return user_response.data;
//   });



// const UserRegisterSlice = createSlice({
//   name: 'user',
//   initialState: initialState_user,
//   reducers: {
//   },  
//     extraReducers: {
//     [createUser.pending]: (state, action) => {
//       state.allData.loginStatus = status.loading;
//     },
//     [createUser.fulfilled]: (state, {payload}) => {
//       state.allData.loginStatus = status.success;
//       state.allData.info = payload.user;   
//       //  store.dispatch(ACTIONS.auth.setToken(payload.token))
      

//     },
//     [createUser.rejected]: (state,action) => {
//       state.allData.loginStatus = status.error;

//     },


//   }
// });



// export default UserRegisterSlice;
