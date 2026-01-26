import { auth } from "../firebase";

export default function Message({ message }) {
  if (!message || !auth.currentUser) return null;

  const isMe = message.uid === auth.currentUser.uid;

  return (
    <div className={`message ${isMe ? "me" : "other"}`}>
      <p>{message.text}</p>
    </div>
  );
}
