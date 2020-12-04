import { authService, dbService } from "fbManager";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogoutClick = (event) => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div className="switchRouters">
      <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
          <input
            type="text"
            placeholder="New Display name"
            onChange={onChange}
            value={newDisplayName}
            required
            autoFocus
            className="formInput"
          />
          <input
            type="submit"
            value="Update Profile"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          />
        </form>
        <span onClick={onLogoutClick} className="formBtn cancelBtn logOut">
          Log out
        </span>
      </div>
    </div>
  );
};
export default Profile;
