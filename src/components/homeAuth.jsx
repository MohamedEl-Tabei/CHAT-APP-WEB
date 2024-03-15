//import { useSelector } from "react-redux";
import Components from "../base/components"
import logo from "../base/logo"
const AutHome = () => {
 // const user = useSelector((s) => s.user);

  return (
    <div className="h-100vh d-flex">
      <div style={{width:"45%",backgroundColor:"#e6e6e6"}} className=" w-100-mobile " >
        <Components.NavBar/>
        <Components.Search/>
      </div>
      <div className="bg-darkblue w-100 d-flex justify-content-center align-items-center d-none-mobile " >
        <img src={logo} alt="CHATAPP" style={{width:350}}/>
      </div>
    </div>
  );
};
export default AutHome