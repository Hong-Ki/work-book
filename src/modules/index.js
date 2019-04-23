import {combineReducers} from 'redux';

import words from './words';
import modal from './modal';
import base from './base';
import test from './test';

export default combineReducers({
    words,modal,base,test
});