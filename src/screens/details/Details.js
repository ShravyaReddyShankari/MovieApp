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
                const releaseDate = new Date(releaseDateArr[0], releaseDateArr[1], releaseDateArr[2]);
                setReleaseDate(releaseDate.toDateString());
                setGenres(response.genres.join(", "));
                const trailerId = response.trailer_url.split("=")[1];
                setMovieTrailerId(trailerId);
                if (response.artists != null) {
                    setArtistsData(response.artists);
                }
                else {
                    setArtistsData([]);
                }
            });
    }, []);

    return (
        <div>
            <Header isShowBookShowButton={isShowBookShowButton} movieId={props.match.params.id} />
            <Typography className="back-to-home">
                <Link to={"/"}>
                    <ArrowBackIosIcon className="back-icon" fontSize="small" />
                    Back to home
                </Link>
            </Typography>
            <div className="movie-info">
                <div className="movie-poster">
                    <img src={movie.poster_url} alt={movie.title} />
                </div>
                <div className="movie-details">
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
                    </Typography>
                    <Typography>
                        <b>Rating:</b> {movie.censor_board_rating}
                    </Typography>
                    <div className="plot-trailer">
                        <Typography>
                            <b>Plot:</b> {movie.storyline} {movie.wiki_url}
                        </Typography>
                    </div>
                    <div className="plot-trailer">
                        <Typography>
                            <b>Trailer:</b>
                        </Typography>
                        <YouTube
                            videoId={movieTrailerId}
                        />
                    </div>
                </div>
                <div className="movie-rating">
                    <Typography>
                        <b>Rate this movie:</b>
                    </Typography>
                    <Rating
                        name="customized-empty"
                        defaultValue={0}
                        precision={1}
                        emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.emptyStar} />}
                    />
                    <div className="artists-header">
                        <Typography>
                            <b>Artists:</b>
                        </Typography>
                    </div>
                    <ImageList cols={2}>
                        {artistsData.map((artist) => (
                            <ImageListItem key={artist.profile_url}>
                                <img src={artist.profile_url} alt={artist.first_name + ' ' + artist.last_name} />
                                <ImageListItemBar
                                    title={artist.first_name + ' ' + artist.last_name}
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