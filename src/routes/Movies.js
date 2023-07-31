import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);


  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const apiKey = "85ab2f92"; // OMDbAPI'den aldığınız API anahtarını buraya girin
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie&plot=full&page=${page}`);
      const data = response.data.Search;

      // IMDb puanlarını almak için her film için ayrı bir API çağrısı yapalım
      const moviesWithRatings = await Promise.all(
        data.map(async (movie) => {
          const ratingResponse = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`);
          return {
            ...movie,
            imdbRating: ratingResponse.data.imdbRating,
          };
        })
      );

      setMovies((prevMovies) => [...prevMovies, ...moviesWithRatings]);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <MovieCardTitle>
        <h1>Movie List</h1>
        <h2>Home Page</h2>
      </MovieCardTitle>
      <MovieFlex>
      <MovieContainer>
        {movies.map((movie) => (
          <MovieLi style={{ listStyle: 'none' }}  key={movie.imdbID}>
            <MovieCard>
              <MovieImage src={movie.Poster} alt={movie.Title} />
              <p>{movie.Title}</p>
              <MovieCardInfo>
                <p>{movie.Year}</p>
                <p>{movie.imdbRating}</p>
              </MovieCardInfo>
            </MovieCard>
          </MovieLi>
        ))}
      </MovieContainer>

      <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
      </MovieFlex>
    </div>
  );
};

const MovieCardTitle = styled.div`
display: flex;
justify-content: space-between;
  background-color: blue;
  color: white;
  padding: 1rem;
  h2 {
    cursor: pointer;
    font-size: 30px;
  }
`;


const MovieFlex = styled.div`
    display: flex;
    flex-direction: column;
`;

const MovieContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MovieLi = styled.li`
  width: calc(25% - 10px);
`;

const MovieCard = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  margin-bottom: 10px;
`;

const MovieCardInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoadMoreButton = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

export default Movies;
