import React from 'react';
import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';
import VideoItem from './components/VideoItem';
import { async } from 'q';
// import VideoList from './components/VideoList';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: {
                q: searchTerm,
                part: 'snippet',
                maxResults: 5,
                key: 'AIzaSyBnHI_KvlQ9pvxT_oUsMGgjO7iLL-9dbD8'
            }
        });
        console.log(response.data.items);
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }

    onVideoSelect = (video) => {
        this.setState({
            selectedVideo: video
        })
    }

    render() {
        const { selectedVideo, videos } = this.state;

        return (
            <Grid style={{ justifyContent: "center" }} container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={5}>
                        <Grid item xs={8}>
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                            {<VideoList videos={videos} onVideoSelect={this.onVideoSelect} />}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;