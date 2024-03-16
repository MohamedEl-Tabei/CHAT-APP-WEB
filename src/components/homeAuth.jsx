import { useSelector } from "react-redux";
import Components from "../base/components";
import logo from "../base/logo";
import { useEffect, useState } from "react";
import REQUEST from "../api";
const AutHome = () => {
  const user = useSelector((s) => s.user);
  let [listOfRorF, setListOfRorF] = useState([]);
  useEffect(() => {
    if (user.searchKey.length === 0) {
      if (user.searchFor === "Search chat")
        (async () => {
          let response = await REQUEST.CHATAPP_API.get("user/frends", {
            headers: { "x-auth-token": user.token },
          });
          setListOfRorF(await response.data);
        })();
      else if (user.searchFor === "Search new chat") setListOfRorF([]);
      else if (user.searchFor === "Search request")
        (async () => {
          let response = await REQUEST.CHATAPP_API.get("user/requests", {
            headers: { "x-auth-token": user.token },
          });
          setListOfRorF(await response.data);
        })();
    }
  }, [user.searchKey, user.searchArray, user.searchFor, user.token]);
  return (
    <div className="h-100vh d-flex">
      <div style={{ width: "45%" }} className=" w-100-mobile">
        <Components.NavBar />
        {
          //Search For //1-Search chat //2-Search new chat //3-Search request
          user.searchFor === "Search chat" &&
          (user.searchArray.length || listOfRorF.length) ? (
            <Components.ResultSearchChat data={listOfRorF} />
          ) : user.searchFor === "Search new chat" ? (
            <Components.ResultSearchNewChat  />
          ) : user.searchFor === "Search request" &&
            (user.searchArray.length || listOfRorF.length) ? (
            <Components.ResultSearchRequest data={listOfRorF} />
          ) : (
            <div />
          )
        }
      </div>
      <div className="bg-darkblue w-100 d-flex justify-content-center align-items-center d-none-mobile ">
        <img src={logo} alt="CHATAPP" style={{ width: 350 }} />
      </div>
    </div>
  );
};
export default AutHome;
