import React, { useState, useEffect } from "react";
import Axios from "axios";

const Home = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await Axios.get(
        "https://dev-resources-backend.onrender.com/api/jobs"
      );
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log("Some error occurred in fetching jobs.", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Home</h1>
      {data && data.map((obj) => <h1>Company Title: {obj.companyName}</h1>)}
    </>
  );
};

export default Home;
