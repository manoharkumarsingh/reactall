import {combineReducers} from 'redux'
import User from './user';
import Comment from './comment';

const allReducers = combineReducers({
 User : User,
 Comment : Comment
});

export default allReducers;