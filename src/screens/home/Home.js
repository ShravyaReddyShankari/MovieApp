import React from 'react';
import Header from '../../common/Header.js';
//import { GridListTile } from '@material-ui/core';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    }
  }));

  const useStylesFilter = makeStyles({
    root: {
      minWidth: 240,
      maxWidth: 240,
      margin: theme.spacing.unit
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
  });

const Home = () => {
    const classes = useStyles();
    const classesFilter = useStylesFilter();

    const itemData = this.state;
    const genreData = this.state.genre;
    const artistData = this.state.artist;

    return (
        <div>
            <Header />
            <div classname="header">
                <h1>Upcoming Movies</h1>
            </div>
            <div className={classes.root}>
                <ImageList className={classes.imageList} cols={6} rows={250}>
                    {itemData.map((item) => (
                    <ImageListItem key={item.poster_url}>
                        <img src={item.poster_url} alt={item.title} />
                        <ImageListItemBar
                        title={item.title}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        actionIcon={
                            <IconButton aria-label={`star ${item.title}`}>
                            <StarBorderIcon className={classes.title} />
                            </IconButton>
                        }
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <div className="releasedMovies">
            <ImageList className={classes.imageList} cols={4} rows={350}>
                    {itemData.map((item) => (
                    <ImageListItem key={item.poster_url}>
                        <img src={item.poster_url} alt={item.title} />
                        <ImageListItemBar
                        title={item.title}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        actionIcon={
                            <IconButton aria-label={`star ${item.title}`}>
                            <StarBorderIcon className={classes.title} />
                            </IconButton>
                        }
                        />
                    </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <div className="filters">
            <Card className={classesFilter.root}>
              <CardContent>
                <Typography className={classesFilter.title} color={theme.palette.primary.light} gutterBottom>
                  FIND MOVIES BY:
                </Typography>
                <FormControl>
                  <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                  <Input id="movieName"></Input>
                </FormControl>
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
                    {genreData.map((genre) => (
                      <MenuItem value={genre}>
                      <Checkbox checked={genre} onChange={handleChange} name={genre} />
                    </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                      <Checkbox checked={artist} onChange={handleChange} name={artist.fisrt_name +' '+ artist.lst_name} />
                    </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="releaseStartDate">Release Date Start</InputLabel>
                  <Input id="releaseStartDate" type="date" ></Input>
                  <TextField InputLabelProps={{ shrink: true }} />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="releaseEndDate">Release Date End</InputLabel>
                  <Input id="releaseEndDate" type="date" ></Input>
                  <TextField InputLabelProps={{ shrink: true }} />
                </FormControl>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">APPLY</Button>
              </CardActions>
            </Card>
            </div>
        </div>
    )
}