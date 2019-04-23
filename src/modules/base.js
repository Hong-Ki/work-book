import {Map} from 'immutable';
import {createAction, handleActions} from 'redux-actions';

const SEARCH = 'base/SEARCH';
const SET_MODE = 'base/SET_MODE';
const SWITCH_MENU = 'base/SWITCH_MENU';

export const search = createAction(SEARCH); //keyword
export const setMode = createAction(SET_MODE); //mode
export const switchMenu = createAction(SWITCH_MENU); 

const initialState = Map({
    keyword:'',
    //mode:'WORDS',
    mode:'WORDS',
    isActiveMenu:false
});

export default handleActions ({
    [SEARCH] : (state, action) => 
        state.set('keyword', action.payload)
    ,
    [SET_MODE] : (state, action) => 
        state.set('mode', action.payload)
    ,
    [SWITCH_MENU] : (state, action) => 
        state.set('isActiveMenu', !state.get('isActiveMenu') )
}, initialState);