import {Map, List} from 'immutable';
import {createAction, handleActions} from 'redux-actions';

const CHANGE = 'test/CHANGE';
const INITIALIZE = 'test/INITIALIZE';
const SUBMIT = 'test/SUBMIT';

export const change = createAction(CHANGE); // answer
export const initialize = createAction(INITIALIZE); // answer
export const submit = createAction(SUBMIT); // answer

const initialState = Map ({
    words:List([]),
    wrong:0,
    correct:0
})

/**
 * words : List [ Map( {
 *                  word:string, 
 *                  means:List([string]),
 *                  answers:List([string]),
 *                  isCorrect:boolean,
 *                  id:string,
 *                  isComplete:boolean,
 *                  compoleteCount:number
 * }) ...]
 */

export default handleActions({
    [CHANGE]: (state, action) => {

        return state.mergeIn( ['words', action.payload.index ], action.payload );
    },
    [INITIALIZE]: (state, action) => {
        return state.set('words', action.payload);
    },
    [SUBMIT] : (state, action) => {
        let wrong=0, correct = 0;
        state.get('words').map( word => word.get('isCorrect') ? correct++ : wrong++ );

        return state.set('wrong', wrong).set('correct',correct);
    } 
}, initialState);