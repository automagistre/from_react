import {SET_MANUFACTURE} from "../actions/actionsTypes";

const initialState = {
    manufacture: ''
}

export default function serviceReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MANUFACTURE:
            return {...state, manufacture: action.manufacture.toLowerCase()}
        default:
            return state
    }
}