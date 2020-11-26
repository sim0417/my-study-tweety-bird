import { dbService } from "fbManager";
import React, { useState, useEffect } from "react";

const Home = ({ userObj }) => {
  const [tweety, setTweety] = useState();
  const [tweetys, setTweetys] = useState([]);

  // const loadTweetys = async () => {
  //   const collection = await dbService.collection("tweety").get();
  //   collection.forEach((doc) => {
  //     const tweetyObject = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setTweetys((prev) => [tweetyObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    // loadTweetys();

    dbService.collection("tweety").onSnapshot((snapshot) => {
      const tweetyArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweetys(tweetyArray);
    });
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

  // console.log(tweetys);
  // console.log(userObj);

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
          <div key={data.id}>
            <h4>{data.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
