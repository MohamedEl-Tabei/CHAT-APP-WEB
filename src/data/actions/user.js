import { createAsyncThunk } from "@reduxjs/toolkit";
import REQUEST from "../../api";
import cookie from "js-cookie"
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
  } catch (error) { 
    return  {error:error.response.data};
  }
});
const login=createAsyncThunk("user/login",async(data)=>{
  try {
    let user=await REQUEST.CHATAPP_API.post("/user/login",{...data})
    cookie.set("auth",await user.data.token,{expires:360})
    return await {...data,...user.data,error:""};
  } catch (error) {
    return  {error:error.response.data};
  }
})
const loginByToken=createAsyncThunk("user/login",async(data)=>{
  try {
    let token=cookie.get("auth")
    let user=await REQUEST.CHATAPP_API.get("/user/loginByToken",{headers:{
      "x-auth-token":token
    }})
    return await {...data,...user.data,error:""};
  } catch (error) {
    return  {error:error.response.data};
  }
})

const actions = {
  signup,login,loginByToken
};

export default actions;
