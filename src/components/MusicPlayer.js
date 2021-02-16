import React from 'react'
import ReactDOM from 'react-dom';

import ReactPlayer from 'react-player'
import './MusicPlayer.css';

class MusicPlayer extends React.Component {

    state = {
      index: 1,
      currentTime: '0:00',
      musicList: [{name:'Nice piano and ukulele', audio:'https://www.bensound.com/bensound-music/bensound-buddy.mp3'}, 
        {name:'Gentle acoustic', audio:'https://www.bensound.com//bensound-music/bensound-sunny.mp3'},
        {name:'Corporate motivational', audio:'https://www.bensound.com/bensound-music/bensound-energy.mp3'},
        {name:'Lofi hip hop mix', audio:'https://www.youtube.com/watch?v=5qap5aO4i9A'}],
      pause: false,
    };
  
  
//    componentDidMount() {
//      this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
//      this.playerRef.addEventListener("ended", this.nextSong, false);
//      this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
//      this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
//      this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
//    }
  
//     componentWillUnmount() {
//       this.playerRef.removeEventListener("timeupdate", this.timeUpdate);
//       this.playerRef.removeEventListener("ended", this.nextSong);
//       this.timelineRef.removeEventListener("click", this.changeCurrentTime);
//       this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
//       this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);
//     }
  
    updatePlayer = () =>{
      const { musicList, index } = this.state;
      const currentSong = musicList[index];
      const audio = new Audio(currentSong.audio);
      this.playerRef.load();
    }
    
    clickAudio = (key) =>{
      const { pause } = this.state;
      
      this.setState({
        index: key
      });
      
      this.updatePlayer();
      if(pause){
        this.playerRef.play();
      }
    }
  
    
    render() {
      const { musicList, index, currentTime, pause } = this.state;
      const currentSong = musicList[index];
      return (


    <div className='MusicPlayer'>

        <div className="card">
          <div className="current-song">
            <ReactPlayer
            className="img-wrap" 
            url='https://www.youtube.com/watch?v=5qap5aO4i9A'
            controls
            playbackRate = {2}
            width = "270px"
            height = "200px"
            />
            <span className="song-name">{ currentSong.name }</span>
        </div>
          
          
          
          <div className="play-list" >
            {musicList.map( (music, key=0) =>
                           <div key={key} 
                                onClick={()=>this.clickAudio(key)}
                                className={"track " + 
                                (index === key && !pause ?'current-audio':'') + 
                                (index === key && pause ?'play-now':'')} >
                                
                                <div className="track-discr" >
                                <span className="track-name" >{music.name}</span>
                                </div>
                           </div>
                        )}
          </div>
        </div>
    </div>
      )
    }
  }
  

  export default MusicPlayer;