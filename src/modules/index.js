import {combineReducers} from 'redux';

import words from './words';
import modal from './modal';
import base from './base';

export default combineReducers({
    words,modal,base
});