import { authService } from "fbManager";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onLogoutClick = (event) => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogoutClick}>Log out</button>
    </>
  );
};
export default Profile;
