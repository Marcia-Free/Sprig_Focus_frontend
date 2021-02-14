const goals = (state=[], action) => {
    
    switch(action.type){
      case 'LOGIN_SUCCESS': 
      case 'CURRENT_USER': 
        return action.user.goals
      default: 
        // return state
        return state
    }
  }
  
  export default goals