import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Components from "../base/components";
import DeleteUsers from "../components/deleteUsers";
import Actions from "../base/actions";

const Home = () => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  let [doneDispatch, setDoneDispatch] = useState(false);
  useEffect(() => {
    dispatch(Actions.user.loginByToken());
  }, [dispatch]);
  useEffect(() => {
    setDoneDispatch(user.name.length||user.error.length);
  }, [user.error,user.name]);
  if (doneDispatch)
    return (
      <div>
        <DeleteUsers />
        {user.name.length ? <Components.AuthHome /> : <Components.UnAuthHome />}
      </div>
    );
  else
    return (
      <div className="h-100vh">
        <Components.PleaseWait />
      </div>
    );
};

export default Home;
