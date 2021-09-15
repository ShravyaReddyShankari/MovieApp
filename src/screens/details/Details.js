import React, { useEffect, useState } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './Details.css';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    emptyStar: {
      color: "black"
    }
  }));



const Details = (props) => {
    const classes = useStyles();
    const [movie, setMovie] = useState({});
    const [artistsData, setArtistsData] = useState([]);
    const [releaseDate, setReleaseDate] = useState('');
    const [genres, setGenres] = useState('');
    const isShowBookShowButton = true;
    const [movieTrailerId, setMovieTrailerId] = useState('');

    useEffect(() => {    
        fetch(props.baseUrl + "movies/" + props.match.params.id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            setMovie(response);
            let releaseDateString = response.release_date;
            const releaseDateArr = releaseDateString.split("-");
            const date = new Date(releaseDateArr[0], releaseDateArr[1], releaseDateArr[2]);
            setReleaseDate(date.toDateString());
            setGenres(response.genres.join(", "));
            const trailerId = response.trailer_url.split("=")[1]; //https://www.youtube.com/watch?v=LoebZZ8K5N0
            setMovieTrailerId(trailerId);
            if(response.artists != null) {
                setArtistsData(response.artists);
            }
            else {
                setArtistsData([]);
            }
        });
      }, []);

      const opts = {
        playerVars: { 
            // 'autoplay': 1,
            // 'controls': 0,
            // 'autohide': 1,
            // 'wmode': 'opaque',
            origin: 'http://localhost:3000' 
        }
      }

    return (
        <div>
            <Header isShowBookShowButton={isShowBookShowButton} movieId={props.match.params.id}/>
            <Typography className="backToHome">
                <Link to={"/"}>
                <ArrowBackIosIcon className="backIcon" fontSize="small" />
                Back to home
                </Link>
            </Typography>
            <div className="movieInfo">
            <div className="moviePoster">
                <img src={movie.poster_url} />
            </div>
            <div className="movieDetails">
                <Typography variant="h2">
                 {/* variant="headline" component="h2" */}
                    {movie.title}
                </Typography>
                <Typography>
                   <b>Genre:</b> {genres}
                </Typography>
                <Typography>
                   <b>Duration:</b> {movie.duration}
                </Typography>
                <Typography>
                   <b>Release Date:</b> {releaseDate}
                   {/* {(new Date((movie.release_date.toString().split("-"))[0], (movie.release_date.toString().split("-"))[1], (movie.release_date.toString().split("-"))[2])).toDateString()} */}
                </Typography>
                <Typography>
                   <b>Rating:</b> {movie.censor_board_rating}
                </Typography>
                <div className="plotAndTrailer">
                <Typography>
                   <b>Plot:</b> {movie.storyline} {movie.wiki_url}
                </Typography>
                </div>
                <div className="plotAndTrailer">
                <Typography>
                {/* style={{'marginTop':'16px'}} */}
                   <b>Trailer:</b>  
                </Typography>
                <YouTube 
                    videoId={movieTrailerId}
                    //opts={opts}
                    //host='https://www.youtube.com'
                />
                </div>
            </div>
            <div className="movieRating">
                <Typography>
                    <b>Rate this movie:</b>
                </Typography>
                <Rating
                    name="customized-empty"
                    defaultValue={0}
                    precision={1}
                    emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.emptyStar} />}
                />
                <div className="artistsHeading">
                <Typography>
                    <b>Artists:</b>
                </Typography>
                </div>
                <ImageList cols={2}>
                {artistsData.map((artist) => (
                <ImageListItem key={artist.profile_url}>
                    <img src={artist.profile_url} alt={artist.first_name+' '+artist.last_name} />
                    <ImageListItemBar
                    title={artist.first_name+' '+artist.last_name}
                    // classes={{
                    //     root: classes.titleBar,
                    //     title: classes.title,
                    // }}
                    // actionIcon={
                    //     <IconButton aria-label={`star ${item.title}`}>
                    //     <StarBorderIcon className={classes.title} />
                    //     </IconButton>
                    // }
                    />
                </ImageListItem>
                ))}
            </ImageList>
            </div>
            </div>
        </div>
    )
}

export default Details;