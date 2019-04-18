import {Map, List, fromJS} from 'immutable';
import {createAction, handleActions} from 'redux-actions';

const CREATE = 'word/CREATE';
const UPDATE = 'word/UPDATE';
const REMOVE = 'word/REMOVE';
const LOAD_WORDS = 'word/LOAD_WORDS';

export const create = createAction(CREATE); // {id, word, means[], isComplete, wrongCount }
export const update = createAction(UPDATE); // id, word{ word, means[], isComplete, wrongCount } 
export const remove = createAction(REMOVE); // id
export const loadWords = createAction(LOAD_WORDS); 

const initialState = List([
    /*Map({
        means : List(["T","E","S","T","1"]),
        word : "TEST_1",
        id : '1',
        isComplete : false
    }),
   Map({
        means : List(["T","E","S","T","2"]),
        word : "TEST_2",
        id : 2,
        isComplete : true
    }),
    Map({
        means : List(["T","E","S","T","3"]),
        word : "TEST_3",
        id : 3,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","4"]),
        word : "TEST_4",
        id : 4,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","5"]),
        word : "TEST_5",
        id : 5,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","6"]),
        word : "TEST_6",
        id : 6,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","7"]),
        word : "TEST_7",
        id : 7,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","8"]),
        word : "TEST_8",
        id : 8,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","9"]),
        word : "TEST_9",
        id : 9,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","10"]),
        word : "TEST_10",
        id : 10,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","11"]),
        word : "TEST_11",
        id : 11,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","12"]),
        word : "TEST_12",
        id : 12,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","13"]),
        word : "TEST_13",
        id : 13,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","14"]),
        word : "TEST_14",
        id : 14,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","15"]),
        word : "TEST_15",
        id : 15,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","16"]),
        word : "TEST_16",
        id : 16,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","17"]),
        word : "TEST_17",
        id : 17,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","18"]),
        word : "TEST_18",
        id : 18,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","19"]),
        word : "TEST_19",
        id : 19,
        isComplete : false
    }),
    Map({
        means : List(["T","E","S","T","20"]),
        word : "TEST_20",
        id : 20,
        isComplete : false
    }),*/
]);

export default handleActions({
    [CREATE] : (state, action) => {
        return state.push( Map(action.payload) );
    },
    [UPDATE] : (state, action) => {
        const index = state.findIndex( word => word.get('id') === action.payload.id );

        if ( !action.payload.isEqual( state.get(index).toJS() ) ) {
            const word = action.payload.toImmutable();
            return state.mergeIn([index],  word);
        }
    },
    [REMOVE] : (state, action) => {
        const index = state.findIndex( word => word.get('id') === action.payload );
        
        return state.delete(index);
    },
    /*[SOUND] : (state, action) => {
        const index = state.findIndex( word => word.get('id') === action.payload );
        let msg = new SpeechSynthesisUtterance(state.getIn([index, 'word']));
        msg.lang='en-us';
        msg.volume=1;
        msg.rate=1;
        msg.pitch=1;

        speechSynthesis.speak(msg);

        return state;

    },*/
    [LOAD_WORDS] : (state, action) => {
        return fromJS(action.payload);
    }
}, initialState);