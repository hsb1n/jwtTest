import {combineReducers} from 'redux';
import user from './user_reducer';
/* import comment from './comment_reducer'; */

const rootReducer = combineReducers({
    user,
    /*comment,
 */
})

export default rootReducer;

//combineReducer는 store에 있는 여러가지 리듀서들을 하나로 합쳐줌