const initialState = {
    roomId: '',
    admin: false
}

const CREATE_ROOM = "CREATE_ROOM"
const MAKE_ADMIN = "MAKE_ADMIN"

export default function reducer(state=initialState, action){
    switch(action.type){
        case CREATE_ROOM:
        const {roomId} = action.payload
        return Object.assign({},state,{roomId}) 

        case MAKE_ADMIN:
        const {admin} = action.payload
        return Object.assign({},state,{admin})

        default: return state
    }
}

export function createRoom(roomId){
    return {
        type: CREATE_ROOM,
        payload: {roomId}
    }
}
export function makeAdmin(admin){
    return {
        type: MAKE_ADMIN,
        payload: {admin}
    }
}