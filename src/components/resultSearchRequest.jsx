import { useSelector } from "react-redux";
import Components from "../base/components";
import { useEffect, useState } from "react";

const ResultSearchRequest = ({ data }) => {
  const user = useSelector((s) => s.user);
  let [fromYou, setToYou] = useState();
  let [toYou, setFromYou] = useState();
  let [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (user.searchKey.length) {
      setFromYou(user.searchArray[0]);
      setToYou(user.searchArray[1]);
    } else {
      setFromYou(data[0]);
      setToYou(data[1]);
    }
  }, [data, user.searchKey, user.searchArray]);
  useEffect(() => {
    if (toYou && fromYou) setMounted(true);
  }, [toYou, fromYou]);
  if (mounted)
    return (
      <div className="">
        <h1>Requests From You</h1>
        {fromYou.length ? (
          fromYou.map((r, i) => <h3>{r.name}</h3>)
        ) : (
          <Components.NoData />
        )}
        <h1>Requests to You</h1>
        {toYou.length ? (
          fromYou.map((r, i) => <h3>{r.name}</h3>)
        ) : (
          <Components.NoData />
        )}
      </div>
    );
  return <div />;
};
export default ResultSearchRequest;
