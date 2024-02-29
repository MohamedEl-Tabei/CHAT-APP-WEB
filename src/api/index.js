import axios from "axios"
const config={
   // baseURL:"http://localhost:5000/api"
    baseURL:"https://chat-app-server-ijxt.onrender.com/api"
}

let CHATAPP_API=axios.create(config)
let REQUEST={CHATAPP_API}




export default REQUEST