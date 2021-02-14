const currentUser = (state=null, action) => {
    
    switch(action.type){
      case 'LOGIN_SUCCESS': 
        return {
          id: action.user.id,
          username: action.user.username
        }
      case 'LOGOUT_USER': 
        return null
      default: 
        return state
    }
  }
  
  export default currentUser