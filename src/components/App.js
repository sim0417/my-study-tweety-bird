import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "fbManager";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initalizing..."}
      <footer>&copy; {new Date().getFullYear()} Tweety Bird</footer>
    </>
  );
}

export default App;
