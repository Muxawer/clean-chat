import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./firebase";
import Auth from "./Auth";
import Chat from "./components/Chat";
import Profile from "./pages/Profile";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 AUTH LISTENER
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  // 🔥 REALTIME FIRESTORE LISTENER
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return unsub;
  }, [user]);

  // ✉️ SEND MESSAGE
  async function sendMessage(text) {
    if (!user) return;

    await addDoc(collection(db, "messages"), {
      text,
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
    });
  }

  if (loading) return <p>Loading...</p>;

  if (!user) return <Auth />;

  if (page === "profile") {
    return <Profile onBack={() => setPage("chat")} />;
  }

  return (
    <Chat
      messages={messages}
      onSend={sendMessage}
      onProfile={() => setPage("profile")}
    />
  );
}
