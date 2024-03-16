import { createAsyncThunk } from "@reduxjs/toolkit";
import REQUEST from "../../api";
import cookie from "js-cookie";
const signup = createAsyncThunk("user/signup", async (data) => {
  try {
    let index = data.email.indexOf("@");
    let name = data.email.slice(0, index);
    while (name.length < 3) {
      name.concate("_");
    }
    let user = await REQUEST.CHATAPP_API.post("/user/signup", {
      ...data,
      name: name.slice(0, 21),
    });
    return await { ...data, ...user.data, name: name.slice(0, 21) };
  } catch (error) {
    return { error: error.response.data };
  }
});
const login = createAsyncThunk("user/login", async (data) => {
  try {
    let user = await REQUEST.CHATAPP_API.post("/user/login", { ...data });
    if (data.rememberMe)
      cookie.set("auth", await user.data.token, { expires: 360 });
    else cookie.set("auth", await user.data.token);
    return await { ...data, ...user.data, error: "" };
  } catch (error) {
    return { error: error.response.data };
  }
});
const loginByToken = createAsyncThunk("user/loginByToken", async (data) => {
  try {
    let token = cookie.get("auth");
    let user = await REQUEST.CHATAPP_API.get("/user/loginByToken", {
      headers: {
        "x-auth-token": token,
      },
    });
    return await { ...data, ...user.data, token, error: "" };
  } catch (error) {
    return { error: "Token is expired." };
  }
});
const search = createAsyncThunk("user/search", async (data) => {
  //Search For //1-Search chat //2-Search new chat //3-Search request
  try {
    let users = { data: [] };
    if (data.keyword.length) {
      if (data.for === "Search new chat") {
        users = await REQUEST.CHATAPP_API.post(
          "user/searchNewFriend",
          { keyword: data.keyword },
          {
            headers: {
              "x-auth-token": data.token,
            },
          }
        );
      }
      else if(data.for === "Search chat") {
        users = await REQUEST.CHATAPP_API.post(
          "user/searchFriend",
          { keyword: data.keyword },
          {
            headers: {
              "x-auth-token": data.token,
            },
          }
        );
      }
      else if(data.for==="Search request"){
        users = await REQUEST.CHATAPP_API.post(
          "user/searchRequest",
          { keyword: data.keyword },
          {
            headers: {
              "x-auth-token": data.token,
            },
          }
        );
      }
    }
    return {
      searchFor: data.for,
      searchArray: await users.data,
      error: "",
    };
  } catch (error) {
    return { error: error.response.data };
  }
});
const actions = {
  signup,
  login,
  loginByToken,
  search,
};

export default actions;
