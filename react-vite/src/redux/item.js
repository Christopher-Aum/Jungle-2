const GET_ITEM = 'item/GET_ITEM'
const GET_ITEMS = 'item/GET_ITEMS'
const POST_ITEM = 'item/POST_ITEM'
const UPDATE_ITEM = 'item/UPDATE_ITEM'
const DELETE_ITEM = 'item/DELETE_ITEM'
const POST_COMMENT = 'songs/POST_COMMENT';
const DELETE_COMMENT = 'songs/DELETE_COMMENT';
const EDIT_COMMENT = 'songs/EDIT_COMMENT';

const getItem = (item) => ({
    type: GET_ITEM,
    payload: item
})

const getItems = (items) => ({
    type: GET_ITEMS,
    payload: items
})

const postItem = (item) => ({
    type: POST_ITEM,
    payload: item
})

const updateItem = (item) => ({
    type: UPDATE_ITEM,
    payload: item
})

const deleteItem = (itemId, commentId) => ({
    type: DELETE_ITEM,
    payload: {itemId, commentId}
})

const postComment = (comment) => ({
    type: POST_COMMENT,
    payload: comment
})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId
})

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    payload: comment
})

export const thunkGetItem = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}`)
    if(response.ok){
        const item = await response.json()
        dispatch(getItem(item))
        return item
    }
    const data = await response.json()
    if (data.errors) return data;
}

export const thunkGetItems = () => async (dispatch) => {
    const response = await fetch(`/api/items/`)
    if(response.ok){
        const items = await response.json()

        dispatch(getItems(items))
        return items
    }
    const data = await response.json()
    if (data.errors) return data;
}

export const thunkPostItem = (item) => async (dispatch) => {
    const data = new FormData()
    for (let key of Object.keys(item))
        data.append(key, item[key]);

    const response = await fetch('/api/items/', {
        method: 'POST',
        body: data
    })
    if (response.ok){
        const new_item = await response.json()
        dispatch(postItem(new_item))
        return new_item
    } else {
        const data = await response.json()
        if (data.errors){
            return data
        }
    }
}

export const thunkEditItem = (item) => async (dispatch) => {
    const itemId = item.id;
    const formData = new FormData()
    for (let key of Object.keys(item))
        formData.append(key, item[key])

    const response = await fetch(`/api/items/${itemId}/`, {
        method: 'POST',
        body: formData
    })
    if (response.ok){
        const edit_item = await response.json()
        dispatch(updateItem(edit_item))
        return edit_item
    } else {
        const data = await response.json()
        if(data.errors){
            return data
        }
    }
}

export const thunkDeleteItem = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}/`, {
        method: 'DELETE'
    })
    if (response.ok){
        const delete_item = await response.json()
        dispatch(deleteItem(delete_item))
        return delete_item;
    } else {
        const data = await response.json()
        if (data.errors){
            return data
        }
    }
}

export const thunkPostComment = (itemId, comment) => async (dispatch) => {
    const data = new FormData()
    for (let key of Object.keys(comment))
        data.append(key, comment[key]);
    const response = await fetch(`/api/items/${itemId}/comments/`, {
        method: 'POST',
        body: data
    })
    if (response.ok){
        const post_comment = await response.json()
        dispatch(postComment(post_comment))
        return post_comment
    } else {
        const data = await response.json()
        if (data.errors){
            return data
        }
    }
}

export const thunkDeleteComment = (itemId, commentId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}/comments/${commentId}/`, {
        method: 'DELETE'
    })
    if (response.ok){
        const delete_comment = await response.json()
        dispatch(deleteComment(commentId))
        return delete_comment
    } else {
        const data = await response.json();
        if(data.errors){
            return data
        }
    }
}

export const thunkEditComment = (itemId, comment) => async (dispatch) => {
    const data = new FormData()
    for (let key of Object.keys(comment))
        data.append(key, comment[key]);
    const response = await fetch(`/api/items/${itemId}/comments/${comment.id}/`, {
        method: 'POST',
        body: data
    })
    
    if (response.ok){
        const edit_comment = await response.json()
        dispatch(editComment(edit_comment))
        return edit_comment
    } else {
        const data = await response.json()
        if (data.errors){
            return data
        }
    }
}

const initialState = {items: {}}

const itemReducer = (state=initialState, action) => {
    let newState;
    switch(action.type){
        case GET_ITEM:
            newState = {...state}
            newState.items[action.payload.id] = action.payload
            return newState
        case GET_ITEMS:
            newState = {...state}
            newState.items = action.payload
            return newState
        case POST_ITEM:
            newState = {...state}
            newState.items = {...state.items, [action.payload.id]: action.payload}
            return newState
        case UPDATE_ITEM:
            return {
                ...state,
                item: action.payload
            }
        case DELETE_ITEM:
            newState = {...state}
            newState.items = {...state.items}
            delete newState.items[action.itemId]
            return newState
        case POST_COMMENT:
            newState = {...state}
            newState.items = {...state.items, [action.payload.id]: action.payload}
            return newState
        case EDIT_COMMENT:
            newState = {...state, comment: action.comment}
            return newState
        case DELETE_COMMENT:
            newState = {...state}
            newState.items = {...state.items}
            delete newState.items[action.payload]
            return newState
        default:
            return state
    }
}

export default itemReducer
