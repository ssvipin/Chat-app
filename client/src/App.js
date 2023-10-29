import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001");
function App() {
  const [user, setUser] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomJoined, setRoomJoined] = useState(false);
  const joinRoom = () => {
    if (user !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      setRoomJoined(true);
    }
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {roomJoined ? (
        <Chat socket={socket} user={user} roomId={roomId} />
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", width: "400px" }}
        >
          <h1>Join A chat</h1>
          <input
            style={{
              height: "42px",
              borderRadius: "4px",
              padding: "0 4px",
            }}
            type="text"
            placeholder="your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            style={{
              height: "42px",
              borderRadius: "4px",
              marginTop: "20px",
              padding: "0 4px",
            }}
            type="text"
            placeholder="Room id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            style={{
              marginTop: "40px",
              height: "42px",
              background: "#33bc33",
              color: "white",
              fontSize: "22px",
              cursor: "pointer",
            }}
            onClick={joinRoom}
          >
            Join
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
