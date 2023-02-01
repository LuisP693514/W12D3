
export const RECEIVE_SESSION = 'RECEIVE_SESSION';
export const REMOVE_SESSION = 'REMOVE_SESSION';

export const receiveSession = (payload) =>({
    type: RECEIVE_SESSION,
        payload
})

export const removeSession = (payload) => ({
    type: REMOVE_SESSION,
        payload
})

const sessionReducer = (state = {}, action) => {
    Object.freeze(state)

    const nextState = {...state}

    switch (action.type) {
        case RECEIVE_SESSION:
            nextState[action.payload]
            return ;
        case REMOVE_SESSION:
            delete nextState[action.payload]
            return nextState;
        default:
            return state;
    }
}

export default sessionReducer;