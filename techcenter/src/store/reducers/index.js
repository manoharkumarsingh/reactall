import { combineReducers } from "redux";
import Skill from "./skill";
import Quesans from "./quesans";

const allReducers = combineReducers({
    Skill: Skill,
    Quesans: Quesans
});

export default allReducers;
