import styled, { css } from "styled-components";
import MovieCom from "../components/MovieCom";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieInfoCom from "../components/MovieInfoCom";
import { useNavigate } from "react-router-dom";


export const API_KEY = "85ab2f92";

const INITIAL_PAGE_SIZE = 1;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: blue;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px #555;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
`;
const SearchIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  width: 100%;
`;
const HamburgerIcon = styled.img`
  width: 40px;
  margin-right: 15px;
  background-color: blue;
  cursor: pointer;
`;

const FirstPageButton = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const MoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 5px 4px 5px 0px rgba(0, 0, 0, 0.75);
  width: 125px;
  height: 45px;
  border-style: none;
  cursor: pointer;
  background-color: blue;
  font-size: 20px;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;
const ModalMenu = styled.div`
  height: 300px;
  width: 300px;
  background-color: black;
  padding: 1rem;
  position: absolute;
    top: 13.36%;
    right: 0;
  ${(props) =>
    !props.visible &&
    css`
      display: none;
    `}
`;
const ModalMainMovie = styled.div`
  height: 75px;
  width: 300px;
  background-color: gray;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  &:hover {
    background-color: blue;
  }
`;

const ModalMainSeries = styled.div`
  height: 75px;
  width: 300px;
  background-color: gray;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  &:hover {
    background-color: blue;
  }
`;
const ModalMainLogin = styled.div`
  height: 75px;
  width: 300px;
  background-color: gray;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  &:hover {
    background-color: blue;
  }
`;
const ModalMainSignup = styled.div`
  height: 75px;
  width: 300px;
  background-color: gray;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  &:hover {
    background-color: blue;
  }
`;
const Placeholder = styled.img`
  width: 0px;
  height: 0px;
  margin: 0px;
  opacity: 0%;
`;



function Home() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchData = async (searchString = "Man") => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}&pageSize=${INITIAL_PAGE_SIZE}`
    );

    console.log(response);
    updateMovieList(response.data.Search);
  };
  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeoutId(timeout);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/favicon.png" />
          Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="/search-svgrepo-com.svg" />
          <SearchInput
            placeholder="Search Movies"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
        <HamburgerIcon src="/menu.png" onClick={toggleModal} />
      </Header>
      {selectedMovie && (
        <MovieInfoCom
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}

      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieCom key={index} movie={movie} onMovieSelect={onMovieSelect} />
          ))
        ) : (
          <Placeholder src="/favicon.png" />
        )}
      </MovieListContainer>

      <ModalMenu visible={isModalVisible}>
        <ModalMainMovie onClick={() => navigate("/movies")}>
          <span>filmler</span>
        </ModalMainMovie>
        <ModalMainSeries onClick={() => navigate("/series")}>
          <span>diziler</span>
        </ModalMainSeries>
        <ModalMainLogin onClick={() => navigate("/login")}>
          <span>giriş yap</span>
        </ModalMainLogin>
        <ModalMainSignup onClick={() => navigate("/Signup")}>
          <span>üye ol</span>
        </ModalMainSignup>
      </ModalMenu>


      <FirstPageButton>
        <MoreButton>
          <span>Load More</span>
        </MoreButton>
      </FirstPageButton>
    </Container>
    
  );
  
}

export default Home;
