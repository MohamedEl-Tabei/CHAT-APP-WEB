import axios from "axios"
import variables from "../base/variables"
const config={
   baseURL:`${variables.baseUrl}/api`
}

let CHATAPP_API=axios.create(config)
let REQUEST={CHATAPP_API}




export default REQUEST