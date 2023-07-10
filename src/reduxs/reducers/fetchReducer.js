import { GET_LIST, ADD_TODO, DELETE_TODO, UPDATE_TODO } from "../actions/action-type";

const initialState = [];
const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, action.payload]

        case GET_LIST:
            return action.payload

        case DELETE_TODO:
            return state.filter(state => state.id !== action.payload)

        case UPDATE_TODO:
            return state.map((val) => {
                if (val.id === action.payload.id) val.name = action.payload.name
                return val
            });

        default:
            return state
    }
}
export default fetchReducer;
