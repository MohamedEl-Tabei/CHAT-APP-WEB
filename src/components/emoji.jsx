import { useEffect, useState } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import {
  faCar,
  faClock,
  faFaceGrinWide,
  faGift,
  faHeart,
  faPizzaSlice,
  faSpider,
} from "@fortawesome/free-solid-svg-icons";
import REQUEST from "../api";
const Emoji = ({
  emoji,
  message,
  setMessage,
  selectionStart,
  selectionEnd,
  refMessageInput
}) => {
  let [emojis, setEmojis] = useState();
  let [activeKey, setActiveKey] = useState("Most recently used");
  let [mostRecentlyUsedEmoji, setMostRecentlyUsedEmoji] = useState([]);
  const user = useSelector((s) => s.user);
  const pushEmojis = (list, arr) => {
    if (list.length !== 2) {
      list.forEach((x) => arr.push(x));
    } else {
      var [from, to] = list;
      for (let index = 0; index < 10000; index++) {
        arr.push(String.fromCodePoint(from.codePointAt(0) + index));
        if (String.fromCodePoint(from.codePointAt(0) + index) === to) break;
      }
    }
  };
  const onClickNavItem = (item) => {
    setActiveKey(item);
    let arr = [];
    switch (item) {
      case "Most recently used":
        setEmojis(mostRecentlyUsedEmoji);
        return;
      //pushEmojis(["🌀", "🪕"], arr);
      case "Faces & People":
        [
          ["😀", "😷"],
          ["🤐", "🤕"],
          ["🙁", "🙄"],
          ["🤠", "🤥"],
          ["🤧", "🤯"],
          ["🧐", "🥱", "🥺", "🥰", "🤗"],
          ["🥳", "🥶"],
          ["👹", "👻"],
          ["👽", "💀"],
          ["💩", "🤖", "🎅", "🤶", "👸", "🤴", "👼"],
          ["🧑", "🧔"],
          ["👦", "👩"],
          ["👱", "👶"],
        ].map((list) => pushEmojis(list, arr));
        break;
      case "Animals":
        [
          ["😸", "🙀"],
          ["🙈", "🙊"],
          ["🦥", "🦪"],
          ["🦡", "🦢"],
          ["🐀", "🐼"],
          ["🦀", "🦠"],
          ["🕷", "🕸"],
          ["🦮"],
        ].map((list) => pushEmojis(list, arr));
        break;
      case "Celebrations & Objects":
        [
          ["🎀", "🎄"],
          ["🎆", "🎋"],
          ["🎠", "🎢"],
          ["🎷", "🎼"],
          ["🪕", "🥁", "📯", "🎤", "🎨", "🎭", "🎥", "🎧", "🎬"],
          ["📸", "📻"],
          ["🎮", "🎳"],
          ["🪁", "🤿", "🔫", "🏀", "🏈", "🏹", "🎾", "🏸"],
          ["🏏", "🏓"],
          ["🥊", "🥏"],
          ["🌂", "🥀", "💐", "💍", "💎", "🏮", "🏺", "🏆", "🏅"],
          ["🥇", "🥉"],
          ["🚿", "🛁"],
          ["🚽", "💊", "💉", "💡", "💣", "🔔", "🚪", "🚬", "🛒", "🪀", "📰"],
          ["🔋", "🔓"],
          ["🪑", "🪔"],
          ["🧨", "🧿"],
          ["🔦", "🔪"],
          ["🩸", "🩺"],
          ["🔬", "🔮"],
          ["📞", "📮"],
          ["💻", "📀"],
          ["📁", "📝"],
          ["👑", "👢"],
          ["🥻", "🥿"],
          ["🧢", "🧦"],
          ["🩰", "🩳"],
        ].map((list) => pushEmojis(list, arr));
        break;
      case "Food & Plants":
        [
          ["🍔", "🍼"],
          ["🥐", "🥯"],
          ["🧀", "🧊"],
          ["🌭", "🍓"],
        ].map((list) => pushEmojis(list, arr));
        break;
      case "Transportations & Places":
        [
          ["🛴", "🛺"],
          ["🚀", "🚧"],
          ["🪐"],
          ["🌀"],
          ["🌌", "🌞"],
          ["🗻", "🗿"],
          ["🕋", "🕍"],
          ["⛪", "🛕", "🏯", "🌉", "🌋", "🏰", "🌁"],
          ["🌃", "🌇"],
          ["🏠", "🏭"],
        ].map((list) => pushEmojis(list, arr));
        break;
      case "Symbols":
        [
          ["💯", "💲", "🖤", "🧡"],
          ["🤍", "🤎"],
          ["💙", "💜"],
          ["💓", "💘"],
          ["💝", "💟"],
          ["🟠", "🟤"],
          ["🔴", "🔽"],
          ["🔀", "🔄"],
          ["🔙", "🔝"],
          ["🟥", "🟫"],
          ["💌", "🔇", "🔕", "🔞", "🚳", "🚫", "🚭", "🚯", "🚱", "🚷"],
          ["🕐", "🕧"],
          ["💤", "💨"],
          ["💫", "💭"],
        ].map((list) => pushEmojis(list, arr));
        break;
      default:
        break;
    }
    console.log(arr.length);
    setEmojis(arr);
  };
  useEffect(() => {
    (async () => {
      const response = await REQUEST.CHATAPP_API.get("user/recentlyUsedEmoji", {
        headers: { "x-auth-token": user.token },
      });
      setMostRecentlyUsedEmoji(response.data.mostUsedEmoji);
      setEmojis(response.data.mostUsedEmoji);
    })();
  }, [user.token]);
  return (
    <Accordion activeKey={emoji.toString()}>
      <Accordion.Item className="border-0 border-top" eventKey="true">
        <Accordion.Header className="d-none" />
        <Accordion.Body className="p-0">
          <Nav
            variant="underline"
            className="bg-darkblue p-2 px-sm-5 d-flex justify-content-around"
            data-bs-theme="dark"
            activeKey={activeKey}
          >
            {[
              {
                category: "Most recently used",
                icon: faClock,
              },
              {
                category: "Faces & People",
                icon: faFaceGrinWide,
              },
              {
                category: "Animals",
                icon: faSpider,
              },
              {
                category: "Celebrations & Objects",
                icon: faGift,
              },
              {
                category: "Food & Plants",
                icon: faPizzaSlice,
              },

              {
                category: "Transportations & Places",
                icon: faCar,
              },
              {
                category: "Symbols",
                icon: faHeart,
              },
            ].map((c, i) => {
              return (
                <Nav.Item
                  title={c.category}
                  key={i}
                  onClick={() => onClickNavItem(c.category)}
                >
                  <Nav.Link active={c.category === activeKey}>
                    {<FontAwesomeIcon size="lg" icon={c.icon} />}
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
          <div
            className="overflow-y-scroll p-2 d-flex  flex-wrap"
            style={{ height: 120 }}
          >
            {emojis?.map((e, k) => (
              <div
                onClick={async () => {
                  refMessageInput.current.focus()
                  setMessage(
                    selectionEnd === selectionStart &&
                      selectionEnd === 0 &&
                      message.length
                      ? e + message
                      : selectionEnd === selectionStart
                      ? message.slice(0, selectionStart) +
                        e +
                        message.slice(selectionStart, message.length)
                      : selectionEnd !== selectionStart
                      ? message.slice(0, selectionStart) +
                        e +
                        message.slice(selectionEnd, message.length)
                      : message.concat(e)
                  );
                  let response = await REQUEST.CHATAPP_API.post(
                    "user/addToMostRecentlyUsedEmoji",
                    { emoji: e },
                    { headers: { "x-auth-token": user.token } }
                  );
                  setMostRecentlyUsedEmoji(response.data);
                }}
                key={k}
                className={`pointer fs-4  p-1 d-flex justify-content-center align-items-center shadow rounded-circle ${
                  emojis.length < 15 ? "me-2" : "mx-auto"
                }`}
                style={{ width: 40, height: 40 }}
              >
                {e}
              </div>
            ))}
            {emojis?.map((e, k) => (
              <div
                key={k}
                className="container-fluid bg-dark mx-auto "
                style={{ width: 0, height: 0 }}
              />
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item className="d-none" eventKey="false" />
    </Accordion>
  );
};

export default Emoji;
