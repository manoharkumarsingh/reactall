import {
    COMMENT_USER,
    USER_All_COMMENTS
  } from '../actionTypes';
  
  const initialState = {
    commenteduser: {
        _id : '',
        title:'',
        content:'',
        comment :[]
    },
    
    allcomments:[]
  }
  export default function(state = initialState, action){
    switch(action.type){
        case COMMENT_USER:
        return {
            ...state,
            commenteduser: action.payload
          };
        case USER_All_COMMENTS :
        return {
            ...state,
            allcomments: action.payload
          };
        default:
            return state; 
    }
}



