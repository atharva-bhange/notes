import actionTypes from '../action/actionTypes';

const initialState = [];

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_NOTES:
            return [...action.payload];
        default:
            return [...state];
    }
};

export default notesReducer;
