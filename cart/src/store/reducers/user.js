import {
    USER_SELECTED,
    USER_LIST,
    ADD_USER,
    UPDATE_USER
  } from '../actionTypes';
  
  const initialState = {
    users: {},
    selectedUsers: [{
        _id : '',
        title:'',
        content:''
    }],
    addedUsers: {},
  }
  export default function(state = initialState, action){
    switch(action.type){
        case USER_SELECTED:
        return {
            ...state,
            selectedUsers: action.payload
          };
        case USER_LIST :
        return {
            ...state,
            users: action.payload
          };
        case ADD_USER :
        return {
            ...state,
            addedUsers: action.payload
          };
        case UPDATE_USER : 
        return{
            ...state,
            addedUsers: action.payload
        };

        default:
            return state; 
    }
}



