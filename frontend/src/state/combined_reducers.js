import { combineReducers } from 'redux';
import { counterReducer ,updateCaptionReducer, setUserObjReducer} from './reducer';
const combined_Reducers = combineReducers({
    counterReducer:counterReducer,
    updateCaptionReducer:updateCaptionReducer,
    setUserObjReducer,
    
});

export default combined_Reducers;