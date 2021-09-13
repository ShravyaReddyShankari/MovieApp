import React, { useEffect, useState } from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';
//import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from "react-router-dom";




const Details = (props) => {
    const [movie, setMovie] = useState({});
    const [artistsData, setArtistsData] = useState([]);

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
            if(response.artists != null) {
                setArtistsData(response.artists);
            }
            else {
                setArtistsData([]);
            }
        });
      }, []);

    return (
        <div>
            <Header />
            <Typography className="backToHome">
                <Link to={"/"}>
                    Back to home
                </Link>
            </Typography>
            <div className="moviePoster">
                <img src={movie.poster_url} />
            </div>
            <div className="movieDetails">
                <Typography variant="headlineline" component="h2">
                    {movie.title}
                </Typography>
                <Typography>
                   <b>Genre:</b> {movie.genres}
                </Typography>
                <Typography>
                   <b>Duration:</b> {movie.duration}
                </Typography>
                <Typography>
                   <b>Release Date:</b> {movie.release_date}
                </Typography>
                <Typography>
                   <b>Rating:</b> {movie.censor_board_rating}
                </Typography>
                <Typography style={{'marginTop': '16px'}}>
                   <b>Plot:</b> {movie.storyline} {movie.wiki_url}
                </Typography>
                <Typography style={{'marginTop':'16px'}}>
                   <b>Trailer:</b>  
                   <YouTube videoId={movie.trailer_url} />
                </Typography>
            </div>
            <div className="movieRating">
                <Typography>
                    <b>Rate this movie:</b>
                </Typography>
                {/* <Rating
                    name="customized-empty"
                    defaultValue={0}
                    precision={0.5}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                /> */}
                <Typography style={{'marginTop':'16px', 'marginBottom':'16px'}}>
                    <b>Artists:</b>
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
                </Typography>
            </div>
        </div>
    )
}

export default Details;