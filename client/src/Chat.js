import React, { useEffect, useState } from "react";

const Chat = ({ socket, user, roomId }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (message.trim() !== "") {
      const msgData = {
        room: roomId,
        author: user,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", msgData);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(messageList);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const res = fetch(
        `https://chat-app-13b1f-default-rtdb.firebaseio.com/ChatData/${roomId}.json`,
        options
      );
      if (res) {
        console.log("data sent");
      } else {
        console.log("data sent failed");
      }
    });
    return () => {
      socket.off("whatever_you_named").off();
    };
  }, [socket]);
  return (
    <div
      style={{
        border: "1px solid black",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          background: "black",
          color: "white",
        }}
      >
        <p>Live Chat</p>
      </div>
      <div
        style={{
          height: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          overflowY: "auto",
        }}
      >
        {messageList.map((item, index) => {
          return (
            <p
              style={{
                margin: "0 0 1px 1px",
                fontSize: "14px",
              }}
              key={index}
            >
              {item.message}
            </p>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          style={{
            height: "32px",
          }}
          type="text"
          placeholder="type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          style={{
            height: "38px",
          }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
