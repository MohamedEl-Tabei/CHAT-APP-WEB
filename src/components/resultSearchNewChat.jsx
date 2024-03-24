import { useSelector } from "react-redux";
import Components from "../base/components";
import { Table } from "react-bootstrap";
const ResultSearchNewChat = () => {
  const user = useSelector((s) => s.user);
  if (user.searchKey.length)
    if (user.searchArray.length)
      return (
        <div style={{ height: "90vh" }} className="overflow-y-scroll">
          <Table hover>
            <div className="bg-user swap" />

            <tbody>
              {user.searchArray.map((user, i) => (
                <tr key={i}>
                  <Components.ChatRequest newFriend={user} />
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    else return <Components.NoData />;
  return <div />;
};
export default ResultSearchNewChat;
