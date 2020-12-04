import React, { useState, useEffect } from "react";
import Tweety from "components/Tweety";
import { dbService } from "fbManager";
import TweetyFactory from "components/TweetyFactory";

const Home = ({ userObj }) => {
  const [tweetys, setTweetys] = useState([]);
  const loadTweetys = () => {
    dbService
      .collection("tweety")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
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
    <div className="switchRouters">
      <div className="container">
        <TweetyFactory userObj={userObj} />
        <div style={{ marginTop: 30 }}>
          {tweetys.map((data) => (
            <Tweety key={data.id} tweetyObj={data} isOwner={data.createId === userObj.uid} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
