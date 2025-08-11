import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Painel from "./Painel";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);
  if (!user) return <Login onLogin={() => {}} />;
  return <Painel onLogout={() => setUser(null)} />;
}

export default App;
