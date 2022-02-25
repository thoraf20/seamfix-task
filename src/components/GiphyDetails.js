import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

export default function GiphyDetails() {
  const params = useParams();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios(
          `https://api.giphy.com/v1/gifs/${params.id}`,
          {
            params: {
              api_key: "deokzgUjxm6QHQdp3H3aca1LSZcCpucc",
              // limit: 100,
            },
          }
        );

        console.log(results.data.data);
        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{display: "flex", justifyContent: "center", marginTop: "40px", fontSize: "1.5rem"}}>
      <div style={{border: "1px solid black", borderRadius: "10px", width: "50%", padding: "20px"}}>
        <div class="container">
          <h4>
            <b> Username</b>: {data?.username}
          </h4>
          <h4>
            <b>Slug</b>: {data.slug}
          </h4>
          <p>Title: {data.title}</p>
          <p>Url: { data.url}</p>
          <p>Id: { data.id}</p>
          <p>Trending Time: { data.trending_datetime}</p>
        </div>
      </div>
    </div>
  );
}
