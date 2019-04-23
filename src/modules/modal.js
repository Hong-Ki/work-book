import {Map,List} from  'immutable';
import {createAction, handleActions} from  'redux-actions';

const SHOW = 'modal/SHOW';
const HIDE = 'modal/HIDE';
const CHANGE = 'modal/CHANGE';
const TOGGLE_MEAN_MODE = 'modal/TOOGLE_MEAN_MODE';
const ADD_MEAN = 'modal/ADD_MEAN';
const REMOVE_MEAN = 'modal/REMOVE_MEAN';
const CHANGE_MEAN = 'modal/CHANGE_MEAN';

const SHOW_RESULT = 'modal/result/SHOW';
const HIDE_RESULT = 'modal/result/HIDE';

export const show = createAction(SHOW);
export const hide = createAction(HIDE);
export const change = createAction(CHANGE); // {word, mean}
export const toggleMeanMode = createAction(TOGGLE_MEAN_MODE); // index;
export const addMean = createAction(ADD_MEAN); // Map{ mean:string, id:string, isEditMode:boolean }
export const removeMean = createAction(REMOVE_MEAN); // index
export const changeMean = createAction(CHANGE_MEAN); // input{ index, mean}

export const showResult = createAction(SHOW_RESULT);
export const hideResult = createAction(HIDE_RESULT);

const initialState = Map ( {
    visible:false,
    resultVisible:false,
    mode:'',
    word: Map ( {
        id : null,
        word : '',
        means: List([]), // means : [{id:string, mean:string, isEidtMode:boolean}]
        wrongCounter : -1
    })
});

export default handleActions ({
    [SHOW]: (state, action) => {
        let word = initialState.get('word'), mode = 'add';
        if ( typeof (action.payload) !== 'undefined') {
            word = action.payload;
            mode = 'change';
        }

        return state.set('visible',true).set('word', word).set('mode',mode);
    },
    [HIDE]: (state, action) => {
        return state.set('visible', false).set('word', Map ( {
            id : '',
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
    [TOGGLE_MEAN_MODE] : (state, action) => {
        const index = action.payload;
        const current = state.getIn(['word','means', index, 'isEditMode']);

        return state.setIn(['word', 'means', index, 'isEditMode'], !current );
    },
    [ADD_MEAN]: (state, action) => {
        const means = state.getIn(['word', 'means']);

        return state.setIn(['word','means'], means.push(action.payload));
    },
    [REMOVE_MEAN]: (state, action) => {
        const means = state.getIn(['word', 'means']);
        const index = action.payload;
    
        return state.setIn(['word','means'], means.delete(index));
    },
    [CHANGE_MEAN]: (state, action) => {
        const {index, mean} = action.payload;
        
        return state.mergeIn(['word', 'means', index], Map ({isEditMode:false, mean:mean}) );

    },
    [SHOW_RESULT]: (state,actoin) => {
        return state.set('resultVisible',true);
    },
    [HIDE_RESULT]: (state,actoin) => {
        return state.set('resultVisible',false);
    },
}, initialState);