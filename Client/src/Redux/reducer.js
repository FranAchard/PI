import {
    GET_ALL_VIDEOGAME,
    GET_ALL_GENDERS,
    GET_ONE_GAME,
    FILTER_ORDER,
    FILTER_BY_SOURCE,
    FILTER_BY_GENDER,
    SEARCH_VIDEOGAME,
    LOADER,
    CREATE_VIDEOGAME,
} from "./actions";

const initialState = {
    Videogames: [],
    gamesCopy: [],
    Genders: [],
    VideogameDetail: [],
    loader: true,
    Post: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VIDEOGAME:
            return {
                ...state,
                Videogames: action.payload,
                gamesCopy: action.payload,
            };
        case GET_ALL_GENDERS:
            return {
                ...state,
                Genders: action.payload,
            };
        case GET_ONE_GAME:
            return {
                ...state,
                VideogameDetail: action.payload,
            };
        case FILTER_ORDER:
            const filt = state.Videogames
            if (action.payload === "Z-A") {
                return {
                    ...state,
                    Videogames: filt.sort((ant, next) => next.name.localeCompare(ant.name))
                }
            };
            if (action.payload === "A-Z") {
                return {
                    ...state,
                    Videogames: filt.sort((ant, next) => ant.name.localeCompare(next.name))
                }
            };
            if (action.payload === "Rating ascendete") {
                return {
                    ...state,
                    Videogames: filt.sort((a, b) => {
                        if (a.rating > b.rating) {
                            return -1;
                        }
                        if (b.rating > a.rating) {
                            return 1;
                        }
                        return 0;
                    })
                }
            };
            if (action.payload === "Rating descendete") {
                return {
                    ...state,
                    Videogames: filt.sort((a, b) => {
                        if (a.rating < b.rating) {
                            return -1;
                        }
                        if (b.rating < a.rating) {
                            return 1;
                        }
                        return 0;
                    })
                }
            };
            return state;
        case FILTER_BY_SOURCE:
            const filtrado = state.gamesCopy
            if (action.payload === "All") {
                return {
                    ...state,
                    Videogames: filtrado
                }
            }
            if (action.payload === "Api") {
                return {
                    ...state,
                    Videogames: filtrado.filter(e => !e.hasOwnProperty("createdInDb"))
                }
            }
            if (action.payload === "Created") {
                return {
                    ...state,
                    Videogames: filtrado.filter(e => e.hasOwnProperty("createdInDb"))
                }
            }
            return state;
        case FILTER_BY_GENDER:
            const f = state.gamesCopy
            if (action.payload === "All") {
                return {
                    ...state,
                    Videogames: f
                }
            }
            if (action.payload !== "Gender") {
                return {
                    ...state,
                    Videogames: f.filter(e => e.genders.includes(action.payload))
                }
            }
            return state;
        case SEARCH_VIDEOGAME:
            return {
                ...state,
                Videogames: action.payload
            }
        case LOADER:
            const l = state.loader
            if (l) {
                return {
                    ...state,
                    loader: false
                }
            }
            return {
                ...state,
                loader: true
            }
        case CREATE_VIDEOGAME:
            return {
                ...state
            }
        default:
            return state;
    }
};

export default rootReducer;
