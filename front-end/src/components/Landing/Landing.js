import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

const Landing = ({history}) => {

  const [sport, setSport] = useState("");
  const [zip, setZip] = useState("");

  const handleForm = e => {

    e.preventDefault();

    history.push({
      pathname: '/coaches',
      search: '?zip='+zip+'&sport='+sport+'&radius=5',
  });
  };

  return (
    <div>
      <h1>Athletes Untapped</h1>
      <h2>We are a one stop shop for all of your sports training needs</h2>
      <h3>Ready to train?</h3>
      <form onSubmit={e => handleForm(e)}>
        <input
          value={sport}
          onChange={e => setSport(e.target.value)}
          name="sport"
          type="sport"
          placeholder="Sport"
        />
        <input
          onChange={e => setZip(e.target.value)}
          name="zip"
          value={zip}
          type="zip"
          placeholder="Zip Code"
        />
        <hr />

        <button type="submit">Find Your Coach</button>
      </form>
    </div>
  );
};

export default withRouter(Landing);