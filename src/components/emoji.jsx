import { Accordion } from "react-bootstrap";
const data =
  "😀😁😂🤣😃😄😅😆😗🥰😘😍😎😋😊😉😙😚🙂🤗🤩🤔🤨😮😥😣😏🙄😶😑😐🤐😯😪😫🥱😴😌😛🙃😕😔😓😒🤤😝😜🤑😲🙁😖😞😟😤😬🤯😩😨😧😦😭😢😰😱🥵🥶😳🤪😵🥴🤮🤢🤕🤒😷🤬😡😠🤧😇🥳🥺🤠🤡🤥🤫💀👺👹👿😈🤓🧐🤭".split(
    ""
  );
const Emoji = ({ emoji, message, setMessage }) => {
  return (
    <Accordion activeKey={emoji.toString()}>
      <Accordion.Item className={`${emoji ? "py-1" : ""}`} eventKey="true">
        <Accordion.Header className="d-none" />
        <Accordion.Body className="overflow-y-scroll" style={{ height: 150 }}>
          {data.map((e, k) => (
            <span
              onClick={() => {
                setMessage(message.concat(e));
              }}
              key={k}
              className="pointer fs-4"
            >
              {e}
            </span>
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="d-none" eventKey="false" />
    </Accordion>
  );
};

export default Emoji;
