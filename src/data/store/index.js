import {configureStore}from "@reduxjs/toolkit"
import Reducers from "../../base/reducers"
const store= configureStore({
    reducer:{
        user:Reducers.user
    }
})



export default store