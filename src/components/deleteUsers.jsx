import {Button }from "react-bootstrap"
import REQUEST from "../api/index"
import { useState } from "react"



const DeleteUsers=()=>{
    let [message,setMessage]=useState("Delete");
    const onDelete=async()=>{
        try {
            await setMessage("Loading")
            await REQUEST.CHATAPP_API.delete("/user/deleteUsers");
            await setMessage("Done")
        } catch (error) {
            setMessage(error.response.data)
        }
    }
    return(<Button  variant="danger" onClick={onDelete}>
        {message}
    </Button>)
}
export default DeleteUsers;