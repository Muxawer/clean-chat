import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Header({ onProfile }) {
  const user = auth.currentUser;

  return (
    <header className="header">
      <h1>Clean Chat</h1>

      <div className="header-right">
        <span>{user?.email}</span>
        <button onClick={onProfile}>Profile</button>
      </div>
    </header>
  );
}
