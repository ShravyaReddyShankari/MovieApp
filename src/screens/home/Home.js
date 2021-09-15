import React, {useEffect, useState} from 'react';
import Header from '../../common/header/Header';
//import { GridListTile } from '@material-ui/core';
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent, FormControlLabel } from '@material-ui/core';
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
import { MovieCreation } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';






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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
}));

  const useStylesFilter = makeStyles((theme) => ({
    root: {
      minWidth: 240,
      maxWidth: 240,
      margin: theme.spacing(1)
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      //fontSize: 14,
      color: theme.palette.primary.light
    },
    pos: {
      marginBottom: 12,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

const Home = (props) => {
    const classes = useStyles();
    const classesFilter = useStylesFilter();

    const [moviesList, setMoviesList] = useState([]);
    const [publishedMoviesList, setPublishedMoviesList] = useState([]);
    const [releasedMoviesList, setReleasedMoviesList] = useState([]);
    const [genreData, setGenreData] = useState([]);
    const [artistData, setArtistData] = useState([]);
    const [movieName, setMovieName] = useState('');
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);
    const [releaseStartDate, setReleaseStartDate] = useState('');
    const [releaseEndDate, setReleaseEndDate] = useState('');

    //let genreData = [{}];//this.state; //.genre;
    //let artistData = [{}];//this.state; //.artist;

    async function loadMoviesData() {
        const rawResponse = await fetch("/api/v1/movies?limit=20");
        const data = await rawResponse.json();
        setMoviesList(data["movies"]);
    }

    async function loadGenresData() {
      const rawResponse = await fetch("/api/v1/genres");
      const data = await rawResponse.json();
      //setGenresList(data["genres"]);
      //genreData = data["genres"];
      setGenreData(data["genres"]);
      console.log(genreData);
  }

    async function loadArtistsData() {
      const rawResponse = await fetch("/api/v1/artists?limit=20");
      const data = await rawResponse.json();
      //setArtistsList(data["artists"]);
      //artistData = data["artists"];
      setArtistData(data["artists"]);
      console.log(artistData);
  }
    useEffect(() => {
        // loadMoviesData().then(
        // loadGenresData().then(
        // loadArtistsData()));
        fetch("/api/v1/movies?limit=20")
        .then(result => result.json())
        .then(data => { setMoviesList(data["movies"]); 
                        setPublishedMoviesList(data["movies"].filter(m => m["status"] === "PUBLISHED"));
                        setReleasedMoviesList(data["movies"].filter(m => m["status"] === "RELEASED"));
        })
        .then(d => {
          // let publishedMoviesList = moviesList.filter(m => m["status"] === "PUBLISHED");
          // setPublishedMoviesList(publishedMoviesList);
          // let releasedMoviesList = moviesList.filter(m => m["status"] === "RELEASED");
          // setReleasedMoviesList(releasedMoviesList);
          fetch("/api/v1/genres")
          .then(result => result.json())
          .then(data => setGenreData(data["genres"]))
          .then(d => {
            fetch("/api/v1/artists?limit=20")
            .then(result => result.json())
            .then(data => setArtistData(data["artists"]))
        })
      })
    },[])

    // let publishedMovies = moviesList.filter(m => m["status"] === "PUBLISHED");
    // setPublishedMoviesList(publishedMovies);
    // let releasedMovies = moviesList.filter(m => m["status"] === "RELEASED");
    // setReleasedMoviesList(releasedMovies);
    // setPublishedMoviesList(moviesList.filter(m => m["status"] === "PUBLISHED"));
    // setReleasedMoviesList(moviesList.filter(m => m["status"] === "RELEASED"));

    // const handleGenreChange = (event) => {
    //   setGenre(event.target.value);
    // };

    // const handleArtistChange = (event) => {
    //   setArtist(event.target.value);
    // };

    const handleMovieNameChange = (event) => {
      const value = event.target.value;
      setMovieName(value);
    }

    const handleGenresChangeMultiple = (event) => {
      // const { options } = event.target;
      // const value = [];
      // for (let i = 0, l = options.length; i < l; i += 1) {
      //   if (options[i].selected) {
      //     value.push(options[i].value);
      //   }
      // }
      // setGenres(value);
      const value = event.target.value;
      console.log(value);
      //const genresList = genres;
      //genresList.push(value);
      setGenres(value);
      console.log(genres);
    };

    const handleArtistsChangeMultiple = (event) => {
      // const { options } = event.target;
      // const value = [];
      // for (let i = 0, l = options.length; i < l; i += 1) {
      //   if (options[i].selected) {
      //     value.push(options[i].value);
      //   }
      // }
      // setArtists(value);
      const value = event.target.value;
      //const artistsList = artists;
      //artistsList.push(value);
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
      //event.preventDefault();
      let movieFilterData = [];
      if(movieName != '') {
        movieFilterData = releasedMoviesList.filter((movie) => movie.title.toUpperCase().includes(movieName.toUpperCase()));
        //movie.title.toUpperCase().includes(movieName.toUpperCase())
      }
      if(genres.length > 0) {
        //let genreNames = [];
        // for(let i=0;i<genres.length;i++) {
        //   genreNames.push(genres[i].genre);
        // }
        if(movieFilterData.length > 0) {
          for(let i=0;i<genres.length;i++) {
            movieFilterData = movieFilterData.filter((movie) => movie.genres.includes(genres[i].genre));
          }
        }
        else {
          for(let i=0;i<genres.length;i++) {
            movieFilterData = releasedMoviesList.filter((movie) => movie.genres.includes(genres[i].genre)); 
          }
        }
      }
      if(artists.length > 0) {
        if(movieFilterData.length > 0) {
          // let artistIds = [];
          // for(let i=0;i<movieFilterData.length;i++) {
          //   if(movieFilterData[i].artists != null) {
          //     for(let j=0;j<movieFilterData[i].artists.length;j++) {
          //       artistIds.push(movieFilterData[i].artists[j].id);
          //     }
          //   }
          // }
          let movieArtistsFilterData = [];
            for(var j=0;j<movieFilterData.length;j++) {
              if(movieFilterData[j].artists != null) {
                var artistObjects = movieFilterData[j].artists;
                var c = 0;
                for(var k=0;k<artistObjects.length;k++) {
                  for(var i=0;i<artists.length;i++) {
                    if(artistObjects[k].id == artists[i].id) {
                      //movieArtistsFilterData.push(movieFilterData[j]);
                      c++;
                      break;
                    }
                  }
                }
                if(c != 0) {
                  movieArtistsFilterData.push(movieFilterData[j]);
                  //movieFilterData.splice(j, 1);
                }
              }
            //movieFilterData = movieFilterData.filter((movie) => artistIds.includes(artists[i].id));
          }
          movieFilterData = movieArtistsFilterData;
        }
        else { 
          // let artistIds = [];
          // for(let i=0;i<moviesList.length;i++) {
          //   if(moviesList[i].artists != null) {
          //     for(let j=0;j<moviesList[i].artists.length;j++) {
          //       artistIds.push(moviesList[i].artists[j].id);
          //     }
          //   }
          // }
          for(var j=0;j<releasedMoviesList.length;j++) {
            if(releasedMoviesList[j].artists != null) {
              var artistObjects = releasedMoviesList[j].artists;
              var c = 0;
              for(var k=0;k<artistObjects.length;k++) {
                for(var i=0;i<artists.length;i++) {
                  if(artistObjects[k].id == artists[i].id) {
                    c++;
                    break;
                  }
                }
              }
              if(c != 0) {
                movieFilterData.push(releasedMoviesList[j]);
                //movieFilterData = moviesList.splice(j, 1);
              }
            }
          //movieFilterData = movieList.filter((movie) => artistIds.includes(artists[i].id));
        }
      }
        }
      if(releaseStartDate != '' && releaseEndDate != '') {
        console.log(Date.parse(releaseStartDate));
        if(movieFilterData.length > 0) {
          movieFilterData = movieFilterData.filter((movie) => Date.parse(movie.release_date) >= Date.parse(releaseStartDate) && Date.parse(movie.release_date) <= Date.parse(releaseEndDate));
        }
        else {
          movieFilterData = releasedMoviesList.filter((movie) => Date.parse(movie.release_date) >= Date.parse(releaseStartDate) && Date.parse(movie.release_date) <= Date.parse(releaseEndDate));
        }
      }
      console.log(movieFilterData);
      //setMoviesList(movieFilterData);
      //console.log(moviesList);
      //console.log(publishedMoviesList);
      //releasedMoviesList = {...movieFilterData};
      setReleasedMoviesList(movieFilterData);
      console.log(releasedMoviesList);
    }

    const history = useHistory();

    const movieClickHandler = (id) => {
      history.push("/movie/" + id);
    }

        return (
        <div>
            <Header />
            <div className="subHeader">
                Upcoming Movies
            </div>
            <div className={classes.root}>
              <ImageList className={classes.imageList} cols={6} rowHeight={250}>
                {
                publishedMoviesList.map((movie) => (
                  <ImageListItem key={movie.id}>
                    <img src={movie.poster_url} alt={movie.title} />
                    {/* onClick={movieClickHandler(movie.id)} */}
                    <ImageListItemBar
                      title={movie.title}
                      // classes={{
                      //   root: classes.titleBar,
                      //   title: classes.title
                      // }}
                      // actionIcon={
                      //   <IconButton aria-label={`star ${movie.title}`}>
                      //     <StarBorderIcon className={classes.title} />
                      //   </IconButton>
                      // }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
            <div className="movieFilters">
            <div className="releasedMovies">
            <ImageList cols={4} rowHeight={350} style={{'height':'auto'}}>
                    {releasedMoviesList.map((movie) => (
                    <ImageListItem key={movie.id}>
                        <Link className="moviePosterImageLink" to={"/movie/"+movie.id}>
                        {/* <a className="moviePosterImageAnchor" href="#"> */}
                        <img className="moviePosterImage" src={movie.poster_url} alt={movie.title} />
                        {/* </a> */}
                        </Link>
                        {/* onClick={movieClickHandler(movie.id)} */}
                        <ImageListItemBar
                        title={movie.title}
                        subtitle={"Release Date: " + new Date((movie.release_date.split("-"))[0], (movie.release_date.split("-"))[1], (movie.release_date.split("-"))[2]).toDateString()}
                        // classes={{
                        //     root: classes.titleBar,
                        //     title: classes.title,
                        // }}
                        // actionIcon={
                        //     <IconButton aria-label={`star ${movie.title}`}>
                        //     <StarBorderIcon className={classes.title}/>
                        //     </IconButton>
                        // }
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <div className="filters">
            <Card>
              <CardContent>
                <Typography className={classesFilter.root} className={classesFilter.title}>
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
                    //id="genres"
                    // open={open}
                    // onClose={handleClose}
                    // onOpen={handleOpen}
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
                      {/* <FormControlLabel
                      control = {<Checkbox value={data.genre} />}
                      label = {data.description}
                      /> */}
                     </MenuItem> 
                     ))} 
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
                <br /><br />
                <FormControl className={classesFilter.root}>
                  <InputLabel htmlFor="artists">Artists</InputLabel>
                  <Select
                    labelId="artists-select-label"
                    //id="artists"
                    // open={open}
                    // onClose={handleClose}
                    // onOpen={handleOpen}
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
                        <ListItemText primary={artist.first_name +' '+ artist.last_name} />
                      {/* <FormControlLabel
                      control = { <Checkbox value={artist.first_name +' '+ artist.last_name} /> }
                      label = {artist.first_name +' '+ artist.last_name}
                      /> */}
                      {/* onChange={handleChange} */}
                    </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br /><br />
                <FormControl className={classesFilter.root}>
                  {/* <InputLabel htmlFor="releaseStartDate">Release Date Start</InputLabel> */}
                  <TextField label="Release Date Start" id="releaseStartDate" type="date" value={releaseStartDate} onChange={handleReleaseStartDateChange} InputLabelProps={{ shrink: true }} />
                  {/* <Input id="releaseStartDate" type="date" value={releaseStartDate} onChange={handleReleaseStartDateChange} ></Input> */}
                </FormControl>
                <br /><br />
                <FormControl className={classesFilter.root}>
                  {/* <InputLabel htmlFor="releaseEndDate">Release Date End</InputLabel> */}
                  <TextField label="Release Date End" id="releaseEndDate" type="date" value={releaseEndDate} onChange={handleReleaseEndDateChange} InputLabelProps={{ shrink: true }} />
                  {/* <Input id="releaseEndDate" type="date" value={releaseEndDate} onChange={handleReleaseEndDateChange} ></Input> */}
                  {/* <TextField InputLabelProps={{ shrink: true }} /> */}
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