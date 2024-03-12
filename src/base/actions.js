import user from "../data/actions/user"
import user_  from "../data/reducers/user" 
const Actions={
    user:{...user,...user_.actions}
}



export default Actions