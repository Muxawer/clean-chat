import { useState } from "react";
import Header from "./Header";
import Message from "./Message";
import "../styles/chat.css";

export default function Chat({ messages, onSend, onProfile }) {
  const [text, setText] = useState("");

  async function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) return;

    await onSend(text);
    setText("");
  }

  return (
    <div className="chat-container">
      <Header onProfile={onProfile} />

      <div className="messages">
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
      </div>

      <form className="input-bar" onSubmit={handleSend}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
