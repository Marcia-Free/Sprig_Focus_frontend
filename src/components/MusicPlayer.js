import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

import ReactPlayer from 'react-player'
import { currentUser } from '../actions/auth'
import './MusicPlayer.css';

class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
      index: 0,
      musicList: [],
      urlList: [],
      pause: false,
    };
}
  
  
   componentDidMount() {
    const urlSongs = "http://localhost:3001/songs";
    fetch(urlSongs)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ musicList: response }))
   }
  

    // clickAudio = (id) =>{
    //   const { pause } = this.state;  
    //   const userSongs = this.state.musicList.filter((song, index) => (
    //     song.user_id === this.props.currentUser.id))

    //   const  urls = userSongs.map((song, index) => (
    //     song.url
    // ))
      
    //   this.setState({
    //     index: id,
    //     currentSong: this.state.musicList[id],
    //     urlList: urls
    //   });  

    // }
  
    
    render() {
      const { musicList, index, pause} = this.state;

      const userSongs = musicList.filter((song, index) => (
        song.user_id === this.props.currentUser.id))


      return (

    <div className='MusicPlayer'>

        <div className="card">
          <div className="current-song">
          {/* <ReactPlayer 
          className="img-wrap"
          url='https://youtu.be/ownHh9QIsRk'
          playbackRate = {1}
          width = "270px"
          height = "200px"
          controls /> */}

            <span className="song-name">Chillhop Yearmix</span>
        </div>
          
          
          
          <div className="play-list" >
            {userSongs.map( (song, key) =>
                           <div key={song.id} 
                                // onClick={()=>this.clickAudio(song.id)}
                                className={"track " + 
                                (index === key && !pause ?'current-audio':'') + 
                                (index === key && pause ?'play-now':'')} 
                                >
                                
                                <div className="track-discr" >
                                <span className="track-name" >{song.song_name}</span>
                                </div>
                           </div>
                        )}
          </div>
        </div>
    </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      currentUser: state.currentUser
    }
  }

  

export default connect(mapStateToProps)(MusicPlayer);