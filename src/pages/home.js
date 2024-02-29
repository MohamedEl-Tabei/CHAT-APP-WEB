import Components from "../base/components";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((s) => s.user);
  return (
    <div>
      <h1>{user.name}</h1>{" "}
      {user.name.length ? <Components.AuthHome /> : <Components.UnAuthHome />}
    </div>
  );
};

export default Home;
