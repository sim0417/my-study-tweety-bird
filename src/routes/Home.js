import React, { useState, useEffect } from "react";
import Tweety from "components/Tweety";
import { dbService } from "fbManager";
import TweetyFactory from "components/TweetyFactory";

const Home = ({ userObj }) => {
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

  return (
    <div>
      <TweetyFactory userObj={userObj} />
      <div>
        {tweetys.map((data) => (
          <Tweety key={data.id} tweetyObj={data} isOwner={data.createId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
