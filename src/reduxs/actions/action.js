import { ADD_TODO, DELETE_TODO, UPDATE_TODO, GET_LIST } from "../actions/action-type"

export const addFetchData = (data) => ({
    type: ADD_TODO,
    payload: data
})

export const deleteFetchData = (id) => ({
    type: DELETE_TODO,
    payload: id
})

export const updateFetchData = (data) => ({
    type: UPDATE_TODO,
    payload: data
})

export const getList = (id) => ({
    type: GET_LIST,
    payload: id
})

