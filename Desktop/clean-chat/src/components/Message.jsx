import { auth } from "../firebase";

export default function Message({ message }) {
  const isMe = message.uid === auth.currentUser?.uid;

  return (
    <div className={`message ${isMe ? "me" : "other"}`}>
      <p>{message.text}</p>
    </div>
  );
}
