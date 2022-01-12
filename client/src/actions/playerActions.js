import axios from 'axios';

import {
    GET_PLAYERS,
    ADD_PLAYER,
    DELETE_PLAYER,
    PLAYERS_LOADING
} from './types';

import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getPlayers= () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('/api/players')
        .then(res => 
            dispatch({
                type: GET_PLAYERS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}

export const deletePlayer= (id) => (dispatch, getState) => {
    axios
        .delete('/api/players/'+ id, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: DELETE_PLAYER,
                payload: id
            })
        )
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}

export const addPlayer= (player) => (dispatch, getState) => {
    axios
        .post('/api/players', player, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_PLAYER,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}

export const setItemsLoading = () => {
    return {
        type: PLAYERS_LOADING
    }
}
