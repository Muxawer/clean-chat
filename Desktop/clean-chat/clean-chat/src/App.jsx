import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Auth from "./Auth";
import Chat from "./components/Chat";
import Profile from "./pages/Profile";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("chat");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return <p>Loading…</p>;
  if (!user) return <Auth />; // 🔴 THIS is login

  function sendMessage(text) {
    const newMessage = {
      id: crypto.randomUUID(),
      text,
      uid: user.uid,
    };
    setMessages((prev) => [...prev, newMessage]);
  }

  if (page === "profile") {
    return <Profile user={user} onBack={() => setPage("chat")} />;
  }

  return (
    <Chat
      messages={messages}
      onSend={sendMessage}
      onProfile={() => setPage("profile")}
    />
  );
}
