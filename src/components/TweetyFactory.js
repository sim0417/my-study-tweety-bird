import React, { useState } from "react";
import { dbService, storageService } from "fbManager";
import { v4 as uuidv4 } from "uuid";

const TweetyFactory = ({ userObj }) => {
  const [tweety, setTweety] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const tweetyObj = {
      text: tweety,
      createdAt: Date.now(),
      createId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("tweety").add(tweetyObj);
    setTweety("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweety(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const fileData = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(fileData);
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="What's on your mind ?"
        value={tweety}
        onChange={onChange}
        maxLength={120}
        required
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Tweety!" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default TweetyFactory;