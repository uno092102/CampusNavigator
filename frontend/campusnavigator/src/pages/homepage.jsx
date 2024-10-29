import React, { useEffect } from 'react';

const Homepage = () => {
  useEffect(() => {
    document.title = "Homepage - CampusNavigator";
  }, []);

  return (
    <div>
      <h1>Welcome to Homepage</h1>
    </div>
  );
};

export default Homepage;