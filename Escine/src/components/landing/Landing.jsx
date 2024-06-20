import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../navbar/Navbar"; 
import Footer from "../footer/Footer"; 
import MovieCard from "../movieCard/MovieCard";

const Landing = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = "https://fake-api-nodejs-s8ck.onrender.com/movies";

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch movies: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Navbar />
      <MovieCard/>
      <Footer />
    </>
  );
};

export default Landing;
