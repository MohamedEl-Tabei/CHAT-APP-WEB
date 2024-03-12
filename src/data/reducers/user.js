import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Actions from "../../base/actions";
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
  },
  reducers: {
    logout() {
      Cookies.remove("auth")
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
      }));
  },
});
const reducer = user.reducer;
const actions = user.actions;
const obj = { reducer, actions };
export default obj;
