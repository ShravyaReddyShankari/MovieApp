import React from 'react';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import YouTube from 'react-youtube';
//import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';



const Details = () => {
    const artistData = this.state.artists;
    return (
        <div>
            <Header />
            <Typography className="backToHome">
                Back to home
            </Typography>
            <div className="moviePoster">
                <img src={this.state.poster_url} />
            </div>
            <div className="movieDetails">
                <Typography variant="headlineline" component="h2">
                    {this.state.title}
                </Typography>
                <Typography>
                   <b>Genre:</b> {this.state.genres}
                </Typography>
                <Typography>
                   <b>Duration:</b> {this.state.duration}
                </Typography>
                <Typography>
                   <b>Release Date:</b> {this.state.release_date.toDateString()}
                </Typography>
                <Typography>
                   <b>Rating:</b> {this.state.critics_rating}
                </Typography>
                <Typography style={{'marginTop': '16px'}}>
                   <b>Plot:</b> {this.state.story_line} {this.state.wiki_url}
                </Typography>
                <Typography style={{'marginTop':'16px'}}>
                   <b>Trailer:</b>  
                   <YouTube videoId={this.state.trailer_url} />
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
                    {artistData.map((artist) => (
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