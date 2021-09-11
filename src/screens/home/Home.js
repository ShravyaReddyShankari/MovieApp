import React, {useEffect, useState} from 'react';
import Header from '../../common/header/Header';
//import { GridListTile } from '@material-ui/core';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/styles';
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




const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    //backgroundColor: theme.palette.background.paper
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    //color: theme.palette.primary.light
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
      //margin: theme.spacing.unit
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));

const Home = () => {
    const classes = useStyles();
    const classesFilter = useStylesFilter();

    const [moviesList, setMoviesList] = useState([]);
    // const [genresList, setGenresList] = useState([]);
    // const [artistsList, setArtistsList] = useState([]);

    let genreData = [{}];//this.state; //.genre;
    let artistData = [{}];//this.state; //.artist;

    async function loadMoviesData() {
        const rawResponse = await fetch("/api/v1/movies?limit=20");
        const data = await rawResponse.json();
        setMoviesList(data["movies"]);
    }

    async function loadGenresData() {
      const rawResponse = await fetch("/api/v1/genres");
      const data = await rawResponse.json();
      //setGenresList(data["genres"]);
      genreData = data["genres"];
      console.log(genreData);
  }

    async function loadArtistsData() {
      const rawResponse = await fetch("/api/v1/artists?limit=20");
      const data = await rawResponse.json();
      //setArtistsList(data["artists"]);
      artistData = data["artists"];
      console.log(artistData);
  }
    useEffect(() => {
        loadMoviesData();
        loadGenresData();
        loadArtistsData();
    },[])

    const publishedMoviesList = moviesList.filter(m => m["status"] === "PUBLISHED");
    const releasedMoviesList = moviesList.filter(m => m["status"] === "RELEASED");

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
                    <ImageListItemBar
                      title={movie.title}
                      classes={{
                        root: classes.titleBar,
                        title: classes.title
                      }}
                      actionIcon={
                        <IconButton aria-label={`star ${movie.title}`}>
                          <StarBorderIcon className={classes.title} />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
            <div className="movieFilters">
            <div className="releasedMovies">
            <ImageList cols={4} rowHeight={350} style={{ height: 'auto' }}>
                    {releasedMoviesList.map((movie) => (
                    <ImageListItem key={movie.id}>
                        <img src={movie.poster_url} alt={movie.title} />
                        <ImageListItemBar
                        title={movie.title}
                        // classes={{
                        //     root: classes.titleBar,
                        //     title: classes.title,
                        // }}
                        actionIcon={
                            <IconButton aria-label={`star ${movie.title}`}>
                            <StarBorderIcon className={classes.title}/>
                            </IconButton>
                        }
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <div className="filters">
            <Card>
              <CardContent>
                <Typography className={classesFilter.title} gutterBottom>
                {/* color={theme.palette.primary.light} */}
                  FIND MOVIES BY:
                </Typography>
                <FormControl>
                  <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                  <Input id="movieName"></Input>
                </FormControl>
                <br /><br />
                <FormControl>
                  <InputLabel htmlFor="genres">Genres</InputLabel>
                  <Select
                    //labelId="demo-controlled-open-select-label"
                    id="genres"
                    // open={open}
                    // onClose={handleClose}
                    // onOpen={handleOpen}
                    // value={age}
                    // onChange={handleChange}
                  >
                    {genreData.map((data) => (
                      <MenuItem value={data}>
                      <Checkbox name={data.genre} />
                      {/* onChange={handleChange} */}
                    </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br /><br />
                <FormControl>
                  <InputLabel htmlFor="artists">Artists</InputLabel>
                  <Select
                    //labelId="demo-controlled-open-select-label"
                    id="artists"
                    // open={open}
                    // onClose={handleClose}
                    // onOpen={handleOpen}
                    // value={age}
                    // onChange={handleChange}
                  >
                    {artistData.map((artist) => (
                      <MenuItem value={artist}>
                      <Checkbox name={artist.fisrt_name +' '+ artist.last_name} />
                      {/* onChange={handleChange} */}
                    </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br /><br />
                <FormControl>
                  <InputLabel htmlFor="releaseStartDate">Release Date Start</InputLabel>
                  <Input id="releaseStartDate" type="date" ></Input>
                  <TextField InputLabelProps={{ shrink: true }} />
                </FormControl>
                <br /><br />
                <FormControl>
                  <InputLabel htmlFor="releaseEndDate">Release Date End</InputLabel>
                  <Input id="releaseEndDate" type="date" ></Input>
                  <TextField InputLabelProps={{ shrink: true }} />
                </FormControl>
                <br /><br />
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">APPLY</Button>
              </CardActions>
            </Card>
            </div>
        </div>
        </div>
    )
}

export default Home;