import { Accordion, Nav } from "react-bootstrap";
const data = {
  Faces: [
    "😀",
    "😁",
    "😂",
    "🤣",
    "😃",
    "😄",
    "😅",
    "😆",
    "😗",
    "🥰",
    "😘",
    "😍",
    "😎",
    "😋",
    "😊",
    "😉",
    "😙",
    "😚",
    "🙂",
    "🤗",
    "🤩",
    "🤔",
    "🤨",
    "😮",
    "😥",
    "😣",
    "😏",
    "🙄",
    "😶",
    "😑",
    "😐",
    "🤐",
    "😯",
    "😪",
    "😫",
    "🥱",
    "😴",
    "😌",
    "😛",
    "🙃",
    "😕",
    "😔",
    "😓",
    "😒",
    "🤤",
    "😝",
    "😜",
    "🤑",
    "😲",
    "🙁",
    "😖",
    "😞",
    "😟",
    "😤",
    "😬",
    "🤯",
    "😩",
    "😨",
    "😧",
    "😦",
    "😭",
    "😢",
    "😰",
    "😱",
    "🥵",
    "🥶",
    "😳",
    "🤪",
    "😵",
    "🥴",
    "🤮",
    "🤢",
    "🤕",
    "🤒",
    "😷",
    "🤬",
    "😡",
    "😠",
    "🤧",
    "😇",
    "🥳",
    "🥺",
    "🤠",
    "🤡",
    "🤥",
    "🤫",
    "💀",
    "👺",
    "👹",
    "👿",
    "😈",
    "🤓",
    "🧐",
    "🤭",
    "👻",
    "👽",
    "👾",
    "🤖",
    "💩",
  ],
};
const Emoji = ({ emoji, message, setMessage }) => {
  return (
    <Accordion activeKey={emoji.toString()}>
      <Accordion.Item className="border-0 border-top" eventKey="true">
        <Accordion.Header className="d-none" />
        <Accordion.Body className="p-0">
          <Nav
            variant="underline"
            className="bg-darkblue p-2 d-flex justify-content-around"
            defaultActiveKey="Faces"
            data-bs-theme="dark"
          >
            {[
              "Faces",
              "Animals",
              "People",
              "Celebrations",
              "Objects",
              "Food",
              "Plants",
              "Transportations",
              "Places",
              "Symbols",
            ].map((c, i) => {
              return (
                <Nav.Item>
                  <Nav.Link>{c}</Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
          <div className="overflow-y-scroll p-2 d-flex  flex-wrap" style={{ height: 120 }}>
            {data.Faces.map((e, k) => (
              <div
                onClick={() => {
                  setMessage(message.concat(e));
                }}
                key={k}
                className="pointer fs-4 mx-auto"
              >
                {e}
              </div>
            ))}
           {data.Faces.map((e,k)=> <div key={k} className="container-fluid bg-dark mx-auto " style={{width:0,height:0}}/>)}
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="d-none" eventKey="false" />
    </Accordion>
  );
};

export default Emoji;
