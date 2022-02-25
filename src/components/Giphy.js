import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loader from "./Loader";
import SearchBox from "./SearchBox";

const Giphy = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  //page 1 item 1 - item 25
  //page 2 item 26 - item 50
  //page 3 item 51 - item 75

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "deokzgUjxm6QHQdp3H3aca1LSZcCpucc",
            limit: 100,
          },
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderGifs = () => {
    if (isLoading) {
      return <Loader />;
    }
    return currentItems.map((el) => {
      return (
        <div
          style={{ cursor: "pointer" }}
          key={el.id}
          className="gif"
          onClick={() => navigate(`/${el.id}`)}
        >
          <img src={el.images.fixed_height.url} alt="gif" />
        </div>
      );
    });
  };

  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show" role="alert">
          Unable to get Gifs, please try again in a few minutes
        </div>
      );
    }
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search?", {
        params: {
          api_key: "deokzgUjxm6QHQdp3H3aca1LSZcCpucc",
          q: search,
          limit: 100,
        },
      });
      setData(results.data.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }

    setIsLoading(false);
  };

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ margin: "20px" }}>
      {renderError()}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <SearchBox
          search={search}
          handleSearchChange={handleSearchChange}
          handleSubmit={handleSubmit}
        />
      </div>
      
      <div className="container gifs my-10">{renderGifs()}</div>
    </div>
  );
};

export default Giphy;
