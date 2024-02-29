import { createAsyncThunk } from "@reduxjs/toolkit";
import REQUEST from "../../api";
const signup = createAsyncThunk("user/signup", async (data) => {
  try {
    let index=data.email.indexOf("@")
    let name=data.email.slice(0,index)
    while(name.length<3)
    {
        name.concate("_")
    }
    let user = await REQUEST.CHATAPP_API.post("/user/signup", {...data,name:name.slice(0,21)});
    return await {...data,...user.data,name:name.slice(0,21)};
  } catch (error) { }
});

const actions = {
  signup,
};

export default actions;
