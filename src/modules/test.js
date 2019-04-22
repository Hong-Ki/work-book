import {Map, List} from 'immutable';
import {createAction, handleActions} from 'redux-actions';

const CHANGE = 'test/CHANGE';

export const change = createAction(CHANGE); // answer

const initialState = Map ({
    answers : List([])
})

export default handleActions({
    [CHANGE]: (state, action) => {
        const {answer} = action.payload;

        return state.set('answers', List( answer.split(',')
                                                .map(mean => mean.toUpperCase().trim())
                                                .sort()
                                        )
                        )
    }
}, initialState);