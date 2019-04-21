import {Map, List, fromJS} from 'immutable';
import {createAction, handleActions} from 'redux-actions';

const CREATE = 'word/CREATE';
const UPDATE = 'word/UPDATE';
const REMOVE = 'word/REMOVE';
const LOAD_WORDS = 'word/LOAD_WORDS';

export const create = createAction(CREATE); // Map{id, word, List[means], isComplete, wrongCount }
export const update = createAction(UPDATE); // id, word{ word, List[means], isComplete, wrongCount } 
export const remove = createAction(REMOVE); // List[id]
export const loadWords = createAction(LOAD_WORDS); 

const initialState = List([
    Map({
        means : List(["이곳을 클릭하면 수정이 가능해요!"]),
        word : "단어가 없네요!",
        id : 'Default',
        isComplete : false
    })
]);

export default handleActions({
    [CREATE] : (state, action) => {
        const index = state.findIndex( word => word.get('word') === action.payload.get('word') );
debugger;
        if ( index < 0) {
            return state.push( action.payload );
        }

        if ( window.confirm('Do you want Merge?') ) {
            let means = state.getIn([index, 'means']).toJS();
            const editMeans = action.payload.get('means').toJS();

            for (let key in means) {                
                let idx = editMeans.findIndex( mean => mean.replace(/ /g,'') === means[key].replace(/ /g,'') );
                if (idx > -1) {
                    means[key] = editMeans[idx];
                    editMeans.splice(idx, 1);
                }
            }

            return state.setIn([index,'means'], List(means.concat(editMeans)));

        }

        return state;
    },
    [UPDATE] : (state, action) => {
        const index = state.findIndex( word => word.get('id') === action.payload.id );
        const isExist = state.delete(index).findIndex( word => word.get('word') === action.payload.word ) > -1;
        
        if ( isExist ) {
            alert('it is dupplicate');
            return state;
        }

        if ( !action.payload.isEqual( state.get(index).toJS() ) ) {
            const word = action.payload.toImmutable();
            return state.mergeIn([index],  word);
        }

    },
    [REMOVE] : (state, action) => {
        const result = state.filter (
            word => action.payload.findIndex( id => word.get('id') === id ) <0
        );

        return result;

    },
    [LOAD_WORDS] : (state, action) => {
        return fromJS(action.payload);
    }
}, initialState);