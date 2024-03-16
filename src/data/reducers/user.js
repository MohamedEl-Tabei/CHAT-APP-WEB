import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Actions from "../../base/actions";
import Util from "../../base/util"
const user = createSlice({
  name: "user",
  initialState: {
    token: "",
    name: "",
    id: "",
    image: "",
    email: "",
    friends: [],
    requestToYou: [],
    requestFromYou: [],
    error: "",
    searchFor: "",
    searchArray: [],
  },
  reducers: {
    setErrorEmpty(state) {
      return { ...state, error: "" };
    },
    setSearchArrayEmpty(state){
      Util.arrays.deleteArray(state.searchArray)
      return state
    },
    logout() {
      Cookies.remove("auth");
      return {
        token: "",
        name: "",
        id: "",
        image: "",
        email: "",
        friends: [],
        requestToYou: [],
        requestFromYou: [],
        error: "",
        searchFor: "",
        searchArray: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Actions.user.signup.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      .addCase(Actions.user.login.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      .addCase(Actions.user.loginByToken.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      .addCase(Actions.user.search.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }));
  },
});
const reducer = user.reducer;
const actions = user.actions;
const obj = { reducer, actions };
export default obj;
