import { useSelector } from "react-redux";
import Components from "../base/components";
import logo from "../base/logo";
const AutHome = () => {
  const user = useSelector((s) => s.user);
  const getAllFreinds = () => {};
  const getAllRequests = () => {};
  return (
    <div className="h-100vh d-flex">
      <div style={{ width: "45%" }} className=" w-100-mobile ">
        <Components.NavBar />
        {
          //Search For //1-Search chat //2-Search new chat //3-Search request
          user.searchFor === "Search chat"
            ? user.searchArray?.map((u, i) => (
                <div key={i}>
                  <Components.ResultSearchNewChat user_={u} />
                </div>
              ))
            : user.searchFor === "Search new chat"
            ? user.searchArray?.map((u, i) => (
                <div key={i}>
                  <Components.ResultSearchNewChat user_={u} />
                </div>
              ))
            : user.searchFor === "Search request"
            ? user.searchArray?.map((type) =>
                type?.map((request,i) => (
                  <div key={i}>
                    <Components.ResultSearchNewChat user_={request} />
                  </div>
                ))
              )
            : ""
        }
      </div>
      <div className="bg-darkblue w-100 d-flex justify-content-center align-items-center d-none-mobile ">
        <img src={logo} alt="CHATAPP" style={{ width: 350 }} />
      </div>
    </div>
  );
};
export default AutHome;
