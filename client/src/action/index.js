import apiHandler from '../apiHandler';
import api from '../api';
import actionTypes from './actionTypes';
import history from '../history';

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

export const searchNotes = (key) => async (dispatch) => {
    new apiHandler(
        api.get('/notes/search', {
            params: {
                key,
            },
        })
    )
        .code(200, (res) => {
            dispatch({
                type: actionTypes.GET_NOTES,
                payload: res.data.data.results,
            });
        })
        .onError((err) => {
            console.log(err);
        })
        .call();
};

export const createNote = (formValues) => async () => {
    let data = new FormData();
    data.append('title', formValues.title);
    data.append('description', formValues.description);
    data.append('image', formValues.image);
    new apiHandler(api.post('/notes', data))
        .code(201, (res) => {
            // console.log(res);
            history.push('/');
        })
        .onError((err) => {
            console.log(err);
        })
        .call();
};

export const deleteNote = (id) => async (dispatch) => {
    new apiHandler(api.delete(`/notes/${id}`))
        .code(204, () => {
            dispatch({ type: actionTypes.DELETE_NOTE, payload: id });
        })
        .onError((err) => {
            console.log(err);
        })
        .call();
};
