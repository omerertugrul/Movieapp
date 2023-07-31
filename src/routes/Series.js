import React, { Component } from "react";
import axios from 'axios';
import { styled } from "styled-components";



class Series extends Component {
  state = {
    series: []
  };


  async componentDidMount() {
    
    try {
      const apiKey = "85ab2f92"; // OmdbAPI'den aldığınız API anahtarını buraya girin
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=series&type=series&plot=full&page=1`);
      const data = response.data.Search;
      this.setState({ series: data });
    } catch (error) {
      console.error('Error fetching TV shows:', error);
    }
  }

  

  render() {
    const { series } = this.state;


  
    
    return (
      <div>
        <SeriesCardTitle>
        <h1>Series List</h1>
        <h2>Home Page</h2>
      </SeriesCardTitle>
      <SeriesFlex>
        <SeriesContainer>
          {series.map((tvShow) => (
            <SeriesLi style={{ listStyle: 'none' }} key={tvShow.imdbID}>
              <SeriesCard>
              <SeriesImage src={tvShow.Poster} alt={tvShow.Title} />
              <p>{tvShow.Title}</p>
              <SeriesCardInfo>
                <p>{series.Year}</p>
                <p>{series.imdbRating}</p>
              </SeriesCardInfo>
              </SeriesCard>
            </SeriesLi>
          ))}
        </SeriesContainer>

        </SeriesFlex>
      </div>
    );
  }
}

const SeriesCardTitle = styled.div`
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

const SeriesFlex = styled.div`
    display: flex;
    flex-direction: column;
`;

const SeriesContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SeriesLi = styled.li`
  width: calc(25% - 10px);
`;

const SeriesCard = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const SeriesImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  margin-bottom: 10px;
`;

const SeriesCardInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;




export default Series;

