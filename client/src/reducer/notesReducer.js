import actionTypes from '../action/actionTypes';

const initialState = [];

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_NOTES:
            return [...action.payload];
        case actionTypes.DELETE_NOTE:
            return [...state.filter((note) => note._id !== action.payload)];
        default:
            return [...state];
    }
};

export default notesReducer;
