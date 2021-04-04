import apiHandler from '../apiHandler';
import api from '../api';
import actionTypes from './actionTypes';

export const getAllNotes = () => async (dispatch) => {
    new apiHandler(api.get('/notes'))
        .code(200, (res) => {
            dispatch({
                type: actionTypes.GET_NOTES,
                payload: res.data.data.notes,
            });
        })
        .onError((err) => {
            console.log(err);
        })
        .call();
};
