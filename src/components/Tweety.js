import React, { useState } from "react";
import { dbService, storageService } from "fbManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweety = ({ tweetyObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweety, setNewTweety] = useState(tweetyObj.text);
  const onDeleteClick = async (event) => {
    const confirm = window.confirm("Are you sure you want to delete this Tweety?");
    if (confirm) {
      await dbService.doc(`tweety/${tweetyObj.id}`).delete();
      await storageService.refFromURL(tweetyObj.attachmentUrl).delete();
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
    <div className="tweety">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container tweetyEdit">
            <input
              type="text"
              placeholder="Edit your Tweety"
              value={newTweety}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Tweety" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{tweetyObj.text}</h4>
          {tweetyObj.attachmentUrl && <img src={tweetyObj.attachmentUrl} />}
          {isOwner && (
            <div className="tweety__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweety;
