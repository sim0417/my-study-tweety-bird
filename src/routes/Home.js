import { dbService } from "fbManager";
import React, { useState, useEffect } from "react";
import Tweety from "components/Tweety";

const Home = ({ userObj }) => {
  const [tweety, setTweety] = useState();
  const [tweetys, setTweetys] = useState([]);

  const loadTweetys = () => {
    dbService.collection("tweety").onSnapshot((snapshot) => {
      const tweetyArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweetys(tweetyArray);
    });
  };

  useEffect(() => {
    loadTweetys();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.collection("tweety").add({
      text: tweety,
      createdAt: Date.now(),
      createId: userObj.uid,
    });
    setTweety("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweety(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind ?"
          value={tweety}
          onChange={onChange}
          maxLength={120}
          required
        />
        <input type="submit" value="Tweety!" />
      </form>
      <div>
        {tweetys.map((data) => (
          <Tweety key={data.id} tweetyObj={data} isOwner={data.createId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
