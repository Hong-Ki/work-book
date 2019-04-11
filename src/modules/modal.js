import {Map,List} from  'immutable';
import {createAction, handleActions} from  'redux-actions';
import {Record} from 'immutable';

const SHOW = 'modal/SHOW';
const HIDE = 'modal/HIDE';
const CHANGE = 'modal/CHANGE';
const ADD_MEAN = 'modal/ADD_MEAN';
const REMOVE_MEAN = 'modal/REMOVE_MEAN';
const CHANGE_MEAN = 'modal/CHANGE_MEAN';

export const show = createAction(SHOW);
export const hide = createAction(HIDE);
export const change = createAction(CHANGE); // {word, mean}
export const addMean = createAction(ADD_MEAN); // mean
export const removeMean = createAction(REMOVE_MEAN);
export const changeMean = createAction(CHANGE_MEAN);


const initialState = Map ( {
    visible:false,
    mode:null,
    word: Map ( {
        id : null,
        word : '',
        means: List([]),
        wrongCounter : -1
    })
});

export default handleActions ({
    [SHOW]: (state, action) => {
        const {mode, word} = action.payload;
        
        return state.set('visible', true)
        .set('mode', mode)
        .set('word', Map(word))
        
    },
    [HIDE]: (state, action) => {
        state.set('visible', true);
        
    },
    [CHANGE]: (state, action) => {
        const word = state.getIn(['word']);
        const input = action.payload;

        if ( word.get('word') !== input.word ) {
            return state.setIn(['word', 'word'], input.word ); 
        }

        if ( word.get('means').findIndex( mean => mean === input.mean ) < 0 
                && input.mean !== '' ) {
            return state.setIn(['word','means'], word.get('means').push(input.mean) );
        }

        return state;
    },
    [ADD_MEAN]: (state, action) => {
        const mean = action.payload;

    },
    [REMOVE_MEAN]: (state, action) => {
    },
    [CHANGE_MEAN]: (state, action) => {
    }
}, initialState);