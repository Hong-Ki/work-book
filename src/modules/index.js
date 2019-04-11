import {combineReducers} from 'redux';

import words from './words';
import modal from './modal';

export default combineReducers({
    words,modal
});