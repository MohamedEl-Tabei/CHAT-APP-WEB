import Components from "../base/components";
import { useSelector } from "react-redux";
import DeleteUsers from "../components/deleteUsers";

const Home = () => {
  const user = useSelector((s) => s.user);
  return (
    <div>
      <DeleteUsers/>
      <h1>{user.name}</h1>{" "}
      {user.name.length ? <Components.AuthHome /> : <Components.UnAuthHome />}
    </div>
  );
};

export default Home;
