import { useSelector } from "react-redux";
import Components from "../base/components";

const ResultSearchNewChat = () => {
  const user = useSelector((s) => s.user);
  if (user.searchKey.length)
    if (user.searchArray.length)
      return user.searchArray.map((user) => <h1>{user.name}</h1>);
    else return <Components.NoData />;
  return <div />;
};
export default ResultSearchNewChat;
