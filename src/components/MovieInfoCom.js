import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY } from "../routes/Home";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid black;
`;
const PosterImage = styled.img`
  height: 352px;
  object-fit: cover;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: blue;
  margin: 15px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin: 4px 0;
  color: black;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background-color: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;
const MovieInfoCom = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => setMovieInfo(response.data));
  }, [selectedMovie]);
  return (
    <Container>
      {movieInfo ? (
        <>
          <PosterImage src={movieInfo?.Poster} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type}: {movieInfo?.Title}
            </MovieName>
            <MovieInfo>
              IMDB:<span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              IMDB:<span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language:<span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated:<span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released:<span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime:<span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre:<span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director:<span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors:<span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Plot:<span>{movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoColumn>
          <Close onClick={() => props.onMovieSelect()}>X</Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};
export default MovieInfoCom;