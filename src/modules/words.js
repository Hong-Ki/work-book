import {Map, List, fromJS} from 'immutable';
import {createAction, handleActions} from 'redux-actions';

const CREATE = 'word/CREATE';
const UPDATE = 'word/UPDATE';
const REMOVE = 'word/REMOVE';
const SOUND = 'word/SOUND';
const LOAD_WORDS = 'word/LOAD_WORDS';

export const create = createAction(CREATE); // {id, word, means[], isComplete, wrongCount }
export const update = createAction(UPDATE); // id, word{ word, means[], isComplete, wrongCount } 
export const remove = createAction(REMOVE); // id
export const sound = createAction(SOUND); // id
export const loadWords = createAction(LOAD_WORDS); 

const initialState = List([
    Map({
        mean : List(["T","E","S","T","1"]),
        word : "TEST_1",
        id : 1,
        isComplete : false
    }),
   Map({
        mean : List(["T","E","S","T","2"]),
        word : "TEST_2",
        id : 2,
        isComplete : true
    }),
    Map({
        mean : List(["T","E","S","T","3"]),
        word : "TEST_3",
        id : 3,
        isComplete : false
    }),
    Map({
        mean : List(["T","E","S","T","4"]),
        word : "TEST_4",
        id : 4,
        isComplete : false
    }),
    Map({
        mean : List(["T","E","S","T","5"]),
        word : "TEST_5",
        id : 5,
        isComplete : false
    }),
    Map({
        mean : List(["T","E","S","T","6"]),
        word : "TEST_6",
        id : 6,
        isComplete : false
    })
]);

export default handleActions({
    [CREATE] : (state, action) => {
        return state.push( Map(action.payload) );
    },
    [UPDATE] : (state, action) => {
        const index = state.findIndex( word => word.get('id') === action.payload.id );

        return state.mergeIn([index], action.payload.word);

    },
    [REMOVE] : (state, action) => {
        const index = state.findIndex( word => word.get('id') === action.payload );
        
        return state.delete(index);
    },
    [SOUND] : (state, action) => {
        const index = state.findIndex( word => word.get('id') === action.payload );
        let msg = new SpeechSynthesisUtterance(state.getIn([index, 'word']));
        msg.lang='en-us';
        msg.volume=1;
        msg.rate=1;
        msg.pitch=1;

        speechSynthesis.speak(msg);

    },
    [LOAD_WORDS] : (state, action) => {
        return fromJS(action.payload);
    }
}, initialState);