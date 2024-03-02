import { createSlice } from "@reduxjs/toolkit";
import Actions from "../../base/actions";
const user = createSlice({
  name: "user",
  initialState: {
    token:"",
    name: "",
    id: "",
    image: "",
    email: "",
    friends: [],
    requestToYou: [],
    requestFromYou: [],
    error:""
  },
  extraReducers: (builder) => {
    builder.addCase(Actions.user.signup.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    })).addCase(Actions.user.login.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
  },
});
const reducer = user.reducer;
export default reducer;
