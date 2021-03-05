const songs = (state=[], action) => {
    
    switch(action.type){
      case 'LOGIN_SUCCESS': 
      case 'CURRENT_USER': 
        if (action.user.songs) {
            return action.user.songs
        }
        return state
      default: 
        return state
    }
  }
  
  export default songs