import { useDispatch, useSelector } from "react-redux";
import Components from "../base/components";
import { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { SocketIO } from "../app";
import REQUEST from "../api";
import Actions from "../base/actions";
const ResultSearchRequest = ({ data }) => {
  const user = useSelector((s) => s.user);
  let [fromYou, setFromYou] = useState();
  let [toYou, setToYou] = useState();
  let [mounted, setMounted] = useState(false);
  let socket = useContext(SocketIO);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.user.deleteNotificationsRequest());
    (async () =>
      await REQUEST.CHATAPP_API.get("user/clearRequestNotifications", {
        headers: { "x-auth-token": user.token },
      }))();
  }, [user.token, dispatch]);
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
  useEffect(() => {
    if (toYou) {
      socket.on("cancelRequestToYou", (userId) => {
        let arr = [];
        toYou.forEach((v) => {
          if (userId !== v._id) arr.push(v);
        });
        setToYou(arr);
      });
      socket.on("newRequest", async (userId) => {
        let newRequest = await REQUEST.CHATAPP_API.get(`user/${userId}`, {
          headers: { "x-auth-token": user.token },
        });
        let newArray=[await newRequest.data]
        toYou.forEach(v=>newArray.push(v))
        setToYou(newArray);
      });
    }
  }, [socket, toYou, user.token]);
  useEffect(() => {
    socket.on("requestAccepted", async (friendId) => {
      if (fromYou) {
        let arr = [];
        fromYou.forEach((v) => {
          if (v._id !== friendId) arr.push(v);
        });
        setFromYou(arr);
      }
    });
    socket.on("requestRefused", async (friendId) => {
      if (fromYou) {
        let arr = [];
        fromYou.forEach((v) => {
          if (v._id !== friendId) arr.push(v);
        });
        setFromYou(arr);
      }
    });
  }, [user.token, socket, fromYou]);
  if (mounted)
    return (
      <div className="">
        <div className="bg-user swap" />

        {[
          { header: "Request to you", body: toYou },
          { header: "Request from you", body: fromYou },
        ].map((item, i) => {
          return (
            <div key={i} className="">
              <Alert className="text-center rounded-0 border-0 m-0">
                {item.header}
              </Alert>
              <div
                className="text-user overflow-y-scroll p-3"
                style={{ height: "37.4vh" }}
              >
                {item.body && item.body.length
                  ? item.body.map((v, i) =>
                      item.header === "Request from you" ? (
                        <div key={i}>
                          {" "}
                          <Components.ChatRequestFromYou newFriend={v} />
                        </div>
                      ) : item.header === "Request to you" ? (
                        <div key={i}>
                          {" "}
                          <Components.ChatRequestToYou newFriend={v} />
                        </div>
                      ) : (
                        ""
                      )
                    )
                  : console.log()}
              </div>
            </div>
          );
        })}
      </div>
    );
  return <div />;
};
export default ResultSearchRequest;
