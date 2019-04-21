import {Map} from 'immutable';
import {createAction, handleActions} from 'redux-actions';

const SEARCH = 'base/SEARCH';
const SET_MODE = 'base/SET_MODE';

export const search = createAction(SEARCH); //keyword
export const setMode = createAction(SET_MODE); //mode

const initialState = Map({
    keyword:'',
    mode:''
});

export default handleActions ({
    [SEARCH] : (state, action) => 
        state.set('keyword', action.payload)
    ,
    [SET_MODE] : (state, action) => 
        state.set('mode', action.payload)
}, initialState);