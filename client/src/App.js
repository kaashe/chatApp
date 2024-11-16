import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./App.module.css";

const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  function sendMessage() {
    socket.emit("send_message", { message: message });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });
  }, []);

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.inputBox}
        onChange={handleMessage}
        placeholder="Type your message..."
        type="text"
      />
      <button className={styles.sendButton} onClick={sendMessage}>
        Send
      </button>
      <h1 className={styles.message}>{receivedMessage}</h1>
    </div>
  );
}

export default App;
