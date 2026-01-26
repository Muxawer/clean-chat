import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Profile({ user, onBack }) {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="profile">
      <h2>Profile</h2>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={onBack}>Back to Chat</button>
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      </div>
    </div>
  );
}
