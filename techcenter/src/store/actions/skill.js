import { courseModule } from "../../api/api";
// import course from "../reducers/skill";
import {
    GET_ALL_SKILL
} from "../actionTypes";
export const skill = () => {
    return async (dispatch) => {
        await courseModule.getCourse()
            .then(res => {
                var skill = {
                    type: GET_ALL_SKILL,
                    payload: res
                }
                dispatch(skill);
            })
            .catch(error => {
                throw (error);
            });
    };
}