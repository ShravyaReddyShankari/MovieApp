import React, { useEffect, useState } from 'react';
import Header from '../../common/header/Header';
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { TextField } from '@material-ui/core';
import './Home.css';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  imageList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
}));

const useStylesFilter = makeStyles((theme) => ({
  root: {
    minWidth: 240,
    maxWidth: 240,
    margin: theme.spacing(1)
  },
  title: {
    color: theme.palette.primary.light
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const classesFilter = useStylesFilter();
  const [publishedMoviesList, setPublishedMoviesList] = useState([]);
  const [releasedMoviesList, setReleasedMoviesList] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [releaseStartDate, setReleaseStartDate] = useState('');
  const [releaseEndDate, setReleaseEndDate] = useState('');

  useEffect(() => {
    fetch(props.baseUrl + "movies?limit=20")
      .then(result => result.json())
      .then(data => {
        setPublishedMoviesList(data["movies"].filter(m => m["status"] === "PUBLISHED"));
        setReleasedMoviesList(data["movies"].filter(m => m["status"] === "RELEASED"));
      })
      .then(d => {
        fetch(props.baseUrl + "genres")
          .then(result => result.json())
          .then(data => setGenreData(data["genres"]))
          .then(d => {
            fetch(props.baseUrl + "artists?limit=20")
              .then(result => result.json())
              .then(data => setArtistData(data["artists"]))
          })
      })
  }, [])

  const handleMovieNameChange = (event) => {
    const value = event.target.value;
    setMovieName(value);
  }

  const handleGenresChangeMultiple = (event) => {
    const value = event.target.value;
    setGenres(value);
  };

  const handleArtistsChangeMultiple = (event) => {
    const value = event.target.value;
    setArtists(value);
  };

  const handleReleaseStartDateChange = (event) => {
    const value = event.target.value;
    setReleaseStartDate(value);
  }

  const handleReleaseEndDateChange = (event) => {
    const value = event.target.value;
    setReleaseEndDate(value);
  }

  const applyFiltersHandler = (event) => {
    let movieFilterData = [];
    if (movieName !== '') {
      movieFilterData = releasedMoviesList.filter((movie) => movie.title.toUpperCase().includes(movieName.toUpperCase()));
    }
    if (genres.length > 0) {
      if (movieFilterData.length > 0) {
        for (let i = 0; i < genres.length; i++) {
          movieFilterData = movieFilterData.filter((movie) => movie.genres.includes(genres[i].genre));
        }
      }
      else {
        for (let i = 0; i < genres.length; i++) {
          movieFilterData = releasedMoviesList.filter((movie) => movie.genres.includes(genres[i].genre));
        }
      }
    }
    if (artists.length > 0) {
      if (movieFilterData.length > 0) {
        let movieArtistsFilterData = [];
        for (let j = 0; j < movieFilterData.length; j++) {
          if (movieFilterData[j].artists != null) {
            let artistObjects = movieFilterData[j].artists;
            let c = 0;
            for (let k = 0; k < artistObjects.length; k++) {
              for (let i = 0; i < artists.length; i++) {
                if (artistObjects[k].id === artists[i].id) {
                  c++;
                  break;
                }
              }
            }
            if (c !== 0) {
              movieArtistsFilterData.push(movieFilterData[j]);
            }
          }
        }
        movieFilterData = movieArtistsFilterData;
      }
      else {
        for (let j = 0; j < releasedMoviesList.length; j++) {
          if (releasedMoviesList[j].artists != null) {
            let artistObjects = releasedMoviesList[j].artists;
            let c = 0;
            for (let k = 0; k < artistObjects.length; k++) {
              for (let i = 0; i < artists.length; i++) {
                if (artistObjects[k].id === artists[i].id) {
                  c++;
                  break;
                }
              }
            }
            if (c !== 0) {
              movieFilterData.push(releasedMoviesList[j]);
            }
          }
        }
      }
    }
    if (releaseStartDate !== '' && releaseEndDate !== '') {
      if (movieFilterData.length > 0) {
        movieFilterData = movieFilterData.filter((movie) => Date.parse(movie.release_date) >= Date.parse(releaseStartDate) && Date.parse(movie.release_date) <= Date.parse(releaseEndDate));
      }
      else {
        movieFilterData = releasedMoviesList.filter((movie) => Date.parse(movie.release_date) >= Date.parse(releaseStartDate) && Date.parse(movie.release_date) <= Date.parse(releaseEndDate));
      }
    }
    setReleasedMoviesList(movieFilterData);
  }

  return (
    <div>
      <Header />
      <div className="sub-header">
        Upcoming Movies
      </div>
      <div className={classes.root}>
        <ImageList className={classes.imageList} cols={6} rowHeight={250}>
          {
            publishedMoviesList.map((movie) => (
              <ImageListItem key={movie.id}>
                <img src={movie.poster_url} alt={movie.title} />
                <ImageListItemBar
                  title={movie.title}
                />
              </ImageListItem>
            ))}
        </ImageList>
      </div>
      <div className="movie-filters">
        <div className="released-movies">
          <ImageList cols={4} rowHeight={350} style={{ 'height': 'auto' }}>
            {releasedMoviesList.map((movie) => (
              <ImageListItem key={movie.id}>
                <Link className="movie-poster-image-link" to={"/movie/" + movie.id}>
                  <img className="movie-poster-image" src={movie.poster_url} alt={movie.title} />
                </Link>
                <ImageListItemBar
                  title={movie.title}
                  subtitle={"Release Date: " + new Date((movie.release_date.split("-"))[0], (movie.release_date.split("-"))[1], (movie.release_date.split("-"))[2]).toDateString()}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>
        <div className="filters">
          <Card>
            <CardContent>
              <Typography className={classesFilter.title}>
                FIND MOVIES BY:
              </Typography>
              <FormControl className={classesFilter.root}>
                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                <Input id="movieName" value={movieName} onChange={handleMovieNameChange}></Input>
              </FormControl>
              <br /><br />
              <FormControl className={classesFilter.root}>
                <InputLabel htmlFor="genres">Genres</InputLabel>
                <Select
                  labelId="genres-select-label"
                  multiple
                  value={genres}
                  onChange={handleGenresChangeMultiple}
                  renderValue={(genres) => (genres.map((genre) => genre.description + ", "))}
                >
                  {genreData.map((data) => (
                    <MenuItem key={data.id} value={data}>
                      <ListItemIcon>
                        <Checkbox checked={genres.indexOf(data) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={data.description} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br /><br />
              <FormControl className={classesFilter.root}>
                <InputLabel htmlFor="artists">Artists</InputLabel>
                <Select
                  labelId="artists-select-label"
                  multiple
                  value={artists}
                  onChange={handleArtistsChangeMultiple}
                  renderValue={(artists) => (artists.map((artist) => artist.first_name + " " + artist.last_name + ", "))}
                >
                  {artistData.map((artist) => (
                    <MenuItem key={artist.id} value={artist}>
                      <ListItemIcon>
                        <Checkbox checked={artists.indexOf(artist) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={artist.first_name + ' ' + artist.last_name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br /><br />
              <FormControl className={classesFilter.root}>
                <TextField label="Release Date Start" id="releaseStartDate" type="date" value={releaseStartDate} onChange={handleReleaseStartDateChange} InputLabelProps={{ shrink: true }} />
              </FormControl>
              <br /><br />
              <FormControl className={classesFilter.root}>
                <TextField label="Release Date End" id="releaseEndDate" type="date" value={releaseEndDate} onChange={handleReleaseEndDateChange} InputLabelProps={{ shrink: true }} />
              </FormControl>
              <br /><br />
            </CardContent>
            <CardActions>
              <Button className={classesFilter.root} variant="contained" color="primary" onClick={applyFiltersHandler}>APPLY</Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home;