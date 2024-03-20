import { useDispatch, useSelector } from "react-redux";
import Components from "../base/components";
import Actions from "../base/actions";
import { Table } from "react-bootstrap";

const ResultSearchChat = ({ data }) => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const onClickChat = (u) => {
    dispatch(Actions.user.setConnectWith(u));
  };

  if (user.searchKey.length)
    if (user.searchArray.length)
      return (
        <Table  hover>
          <tbody>
            {user.searchArray.map((user,i) => (
              <tr key={i} onClick={() => onClickChat(user)}>
                <Components.ChatFriend friend={user} />
              </tr>
            ))}
          </tbody>
        </Table>
      );
    else return <Components.NoData />;
  else if (data.length)
    return (
      <Table  hover>
        <tbody>
          {data.map((user,i) => (
            <tr  key={i} onClick={() => onClickChat(user)}>
              <Components.ChatFriend friend={user} />
            </tr>
          ))}
        </tbody>
      </Table>
    );
  else return <Components.NoData />;
};

export default ResultSearchChat;
