const tasks = (state=[], action) => {
    
    switch(action.type){
      case 'LOGIN_SUCCESS': 
      case 'CURRENT_USER': 
        if (action.user.tasks) {
            return action.user.tasks
        }
        return state
      default: 
        return state
    }
  }
  
  export default tasks