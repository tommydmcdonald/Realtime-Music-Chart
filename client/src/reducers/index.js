import { combineReducers } from 'redux';
import dataReducer from './reducer_data';

const rootReducer = combineReducers({
   data: dataReducer
});

export default rootReducer;
