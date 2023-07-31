import styled from "styled-components";

const MovieMain = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
width: 280px;
box-shadow: 0 3px 10px 0 #aaa;
cursor: pointer;
`;
const PosterImage = styled.img`
height: 362px;
`;
const MovieName = styled.span`
font-size: 18px;
font-weight: 600;
color: black;
margin: 15px 0;
text-transform: capitalize;
`;
const MovieYear = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
`;
const MovieInfo = styled.span`
font-size: 16px;
font-weight: 500;
color: black;
text-transform: capitalize;
`;
const MovieCom = (props) => {
    const {Title, Year, imdbID, Type, Poster}=props.movie;
return <MovieMain onClick={()=>props.onMovieSelect(imdbID)}>
    <PosterImage src={Poster}/>
    <MovieName>{Title}</MovieName>
    <MovieYear>
        <MovieInfo>Year: {Year}</MovieInfo>
        <MovieInfo>Type: {Type}</MovieInfo>

    </MovieYear>
    </MovieMain>
}
export default MovieCom;