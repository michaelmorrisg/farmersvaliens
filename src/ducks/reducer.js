const initialState = {
    roomId: ''
}

const CREATE_ROOM = "CREATE_ROOM"

export default function reducer(state=initialState, action){
    switch(action.type){
        case CREATE_ROOM:
        const {roomId} = action.payload
        return Object.assign({},state,{roomId}) 

        default: return state
    }
}

export function createRoom(roomId){
    return {
        type: CREATE_ROOM,
        payload: {roomId}
    }
}