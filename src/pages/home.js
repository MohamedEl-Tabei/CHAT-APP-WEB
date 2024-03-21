import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Components from "../base/components";
import Actions from "../base/actions";

const Home = () => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  let [doneDispatch, setDoneDispatch] = useState(false);
  useEffect(() => {
    dispatch(Actions.user.loginByToken());
  }, [dispatch]);
  useEffect(() => {
    if (user.name.length || user.error.length) setDoneDispatch(true);
  }, [user.error, user.name]);
  if (doneDispatch)
    return (
      <div className="overflow-hidden">
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
