import axios from "axios"; 

export const GET_ALL_VIDEOGAME = "GET_ALL_VIDEOGAME";
export const GET_ALL_GENDERS = "GET_ALL_GENDERS";
export const GET_ONE_GAME = "GET_ONE_GAME";
export const FILTER_BY_GENDER = "FILTER_BY_GENDER";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const FILTER_ORDER = "FILTER_ORDER";
export const SEARCH_VIDEOGAME = "SEARCH_VIDEOGAME";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const LOADER = "LOADER";
export const SOUND = "SOUND";

export const getAllVideogames = () => async (dispatch) => {
    return await axios.get('/videogames')
        .then(array => dispatch({ type: GET_ALL_VIDEOGAME, payload: array.data }))

};

export const getAllGenres = () => async (dispatch) => {
    return await axios.get('/genders')
        .then(array => dispatch({ type: GET_ALL_GENDERS, payload: array.data }))
};

export const getOneVideogame = (id) => async (dispatch) => {
    return await axios.get(`/videogames/${id}`)
        .then(array => dispatch({ type: GET_ONE_GAME, payload: array.data }))

};

export const filterOrder = (valor) => (dispatch) => {
    return dispatch({ type: FILTER_ORDER, payload: valor })
};

export const filterSource = (valor) => (dispatch) => {
    return dispatch({ type: FILTER_BY_SOURCE, payload: valor })
};

export const filterGender = (valor) => (dispatch) => {
    return dispatch({ type: FILTER_BY_GENDER, payload: valor })
};

export const searchVideoagame = (name) => async (dispatch) => {
    return axios.get(`/videogames?name=${name}`)
        .then(array => dispatch({ type: SEARCH_VIDEOGAME, payload: array.data }))

};

export const createVideogame = (obj) => async (dispatch) => {
    return axios.post(`/videogames`, obj)
        .then(dispatch({ type: CREATE_VIDEOGAME }))
};

export function loading() {
    return { type: LOADER }
}
