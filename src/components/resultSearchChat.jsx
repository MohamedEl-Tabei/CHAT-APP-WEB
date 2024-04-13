import { useDispatch, useSelector } from "react-redux";
import Components from "../base/components";
import Actions from "../base/actions";
import { Table } from "react-bootstrap";
import { SocketIO } from "../app";
import { useContext, useEffect, useState } from "react";
import REQUEST from "../api";
const ResultSearchChat = ({ data }) => {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const socket = useContext(SocketIO);
  let [list, setList] = useState(data);
  const onClickChat = (u) => {
    dispatch(Actions.user.setConnectWith(u));
    dispatch(Actions.user.deleteNotificationsMessage({token:user.token,id:u._id}))
    socket.emit("seeMessage",u._id,user._id)
  };
  useEffect(() => {
    socket.on("requestAccepted", async (friendId) => {
      let friend = await REQUEST.CHATAPP_API.get(`user/${friendId}`, {
        headers: { "x-auth-token": user.token },
      });
      setList([...list, friend.data]);
    });
  }, [user.token, socket, list]);
  if (user.searchKey.length)
    if (user.searchArray.length)
      return (
        <div style={{ height: "90vh" }} className=" overflow-y-scroll">
          <Table hover>
            <tbody className="bg-user swap" />

            <tbody>
              {user.searchArray.map((user, i) => (
                <tr key={i} onClick={() => onClickChat(user)}>
                  <Components.ChatFriend friend={user} />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    else return <Components.NoData />;
  else if (list.length)
    return (
      <div style={{ height: "90vh" }} className=" overflow-y-scroll">
        <Table hover>
          <tbody className="bg-user swap" />

          <tbody>
            {list.map((user, i) => (
              <tr key={i} onClick={() => onClickChat(user)}>
                <Components.ChatFriend friend={user} />
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  else return <Components.NoData />;
};

export default ResultSearchChat;
