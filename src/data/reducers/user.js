import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Actions from "../../base/actions";
const user = createSlice({
  name: "user",
  initialState: {
    token: "",
    name: "",
    _id: "",
    image: "",
    email: "",
    error: "",
    searchFor: "Search chat",
    searchArray: [],
    searchKey: "",
    connectWith: "",
  },
  reducers: {
    setErrorEmpty(state) {
      return { ...state, error: "" };
    },
    setSearchArrayEmpty(state) {
      return { ...state, searchArray: [], searchKey: "" };
    },
    setSearchFor(state, action) {
      return { ...state, searchFor: action.payload,connectWith:"" };
    },
    setConnectWith(state, action) {
      return { ...state, connectWith: action.payload };
    },
    logout() {
      Cookies.remove("auth");
      return {
        token: "",
        name: "",
        _id: "",
        image: "",
        email: "",
        error: "",
        searchFor: "",
        searchArray: [],
        searchKey: "",
        connectWith: "",
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
