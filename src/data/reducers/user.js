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
    connectWith: {_id:""},
    requestNotifications: [],
    messageNotifications: [],
  },
  reducers: {
    deleteNotificationsRequest(state) {
      return { ...state, requestNotifications: [] };
    },
    pushNotificationsRequest(state, action) {
      let arr = [...state.requestNotifications];
      arr.push(action.payload);
      return { ...state, requestNotifications: arr };
    },
    pushNotificationsMessage(state, action) {
      let arr = [...state.messageNotifications];
      arr.push(action.payload);
      return { ...state, messageNotifications: arr };
    },
    
    setErrorEmpty(state) {
      return { ...state, error: "" };
    },
    setSearchArrayEmpty(state) {
      return { ...state, searchArray: [], searchKey: "" };
    },
    setSearchFor(state, action) {
      return { ...state, searchFor: action.payload };
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
        connectWith: {_id:""},
        requestNotifications: [],
        messageNotifications: [],
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
      }))
      .addCase(
        Actions.user.sethNotificationsMessage.fulfilled,
        (state, action) => ({
          ...state,
          ...action.payload,
        })
      )
      .addCase(
        Actions.user.deleteNotificationsMessage.fulfilled,
        (state, action) => ({
          ...state,
          ...action.payload,
        })
      );
  },
});
const reducer = user.reducer;
const actions = user.actions;
const obj = { reducer, actions };
export default obj;
