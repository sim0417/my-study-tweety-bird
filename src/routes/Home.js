import React, { useState } from "react";

const Home = () => {
  const [tweety, setTweety] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
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
        <input type="text" placeholder="" value={tweety} onChange={onChange} maxLength={120} required />
        <input type="submit" value="Tweety!" />
      </form>
    </div>
  );
};
export default Home;
