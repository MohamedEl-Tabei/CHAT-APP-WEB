import { useSelector } from "react-redux";
import Components from "../base/components"
const AutHome = () => {
  const user = useSelector((s) => s.user);

  return (
    <div>
    <Components.NavBar/>
      <div>{user.name}</div>
      <div>{user.image}</div>
      <div>{user.email}</div>
      <div>{user.id}</div>
      <div>{user.token}</div>
    </div>
  );
};
export default AutHome