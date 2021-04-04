import { combineReducers } from 'redux';

import noteReducer from './notesReducer';
import currentNoteReducer from './currentNoteReducer';

const reducers = combineReducers({
    notes: noteReducer,
});

export default reducers;
