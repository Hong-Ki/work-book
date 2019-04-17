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
export const removeMean = createAction(REMOVE_MEAN); // index
export const changeMean = createAction(CHANGE_MEAN); // input{ index, mean}


const initialState = Map ( {
    visible:false,
    mode:null,
    word: Map ( {
        id : null,
        word : '',
        means: List([]), // means : [{mean:string, isEidtMode:boolean}]
        wrongCounter : -1
    })
});

export default handleActions ({
    [SHOW]: (state, action) => {
        let word;
        if ( typeof (action.payload) !== 'undefined') {
            word = action.payload;
        } else {
            word = initialState.get('word');
        }

        return state.set('visible',true).set('word', word);
    },
    [HIDE]: (state, action) => {
        return state.set('visible', false).set('word', Map ( {
            id : null,
            word : '',
            means: List([]), // means : [{mean:string, isEidtMode:boolean}]
            wrongCounter : -1
        })); 
    },
    [CHANGE]: (state, action) => {
        const word = state.getIn(['word']);
        const input = action.payload;

        if ( word.get('word') !== input.word ) {
            return state.setIn(['word', 'word'], input.word ); 
        }

    },
    [ADD_MEAN]: (state, action) => {
        const means = state.getIn(['word', 'means']);
        const mean = Map ( {
            mean : action.payload,
            isEditMode : false
        });

        return state.setIn(['word','means'], means.push(mean));
    },
    [REMOVE_MEAN]: (state, action) => {
        const means = state.getIn(['word', 'means']);
        const index = action.payload;
    
        return state.setIn(['word','means'], means.delete(index));
    },
    [CHANGE_MEAN]: (state, action) => {
        const means = state.getIn(['word', 'means']);
        const {index, mean} = action.payload;

        console.log('modal.js:',index);
        if ( means.getIn([index, 'isEditMode']) ) {
            //to Apply == now EditMode
            return state.setIn(['word', 'means', index], Map ({isEditMode:false, mean:mean}) );
        } else {
            //to Edit
            return state.setIn(['word', 'means', index, 'isEditMode'], true);
        }

    }
}, initialState);