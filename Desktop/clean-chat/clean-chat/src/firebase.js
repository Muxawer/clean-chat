
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLqhL1rthcfpuY9Q54jdOC_EYRTH0ViRc",
  authDomain: "clean-chat-38c26.firebaseapp.com",
  projectId: "708275902324",
  appId: "1:708275902324:web:e39861f7ee179fea07fe21",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
