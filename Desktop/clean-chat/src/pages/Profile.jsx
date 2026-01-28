import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/profile.css";

export default function Profile({ onBack }) {
  return (
    <div className="profile">
      <h2>{auth.currentUser?.email}</h2>

      <button className="logout" onClick={() => signOut(auth)}>
        Log out
      </button>

      <button className="back" onClick={onBack}>
        Back to chat
      </button>
    </div>
  );
}
