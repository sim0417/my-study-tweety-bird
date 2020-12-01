import React, { useState } from "react";
import { dbService } from "fbManager";

const Tweety = ({ tweetyObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweety, setNewTweety] = useState(tweetyObj.text);
  const onDeleteClick = async (event) => {
    const confirm = window.confirm("Are you sure you want to delete this Tweety?");
    if (confirm) {
      await dbService.doc(`tweety/${tweetyObj.id}`).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweety/${tweetyObj.id}`).update({
      text: newTweety,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweety(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Tweety"
              value={newTweety}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Tweety" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetyObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweety;
