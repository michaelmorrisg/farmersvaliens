const initialState = {
    roomId: '',
    player: '',
    admin: false,
    players: []
}

const CREATE_ROOM = "CREATE_ROOM"
const MAKE_ADMIN = "MAKE_ADMIN"
const ADD_PLAYERS = "ADD_PLAYERS"
const ADD_PLAYER = "ADD_PLAYER"

export default function reducer(state=initialState, action){
    switch(action.type){
        case CREATE_ROOM:
        const {roomId} = action.payload
        return Object.assign({},state,{roomId}) 

        case MAKE_ADMIN:
        const {admin} = action.payload
        return Object.assign({},state,{admin})

        case ADD_PLAYERS:
        const {players} = action.payload
        return Object.assign({},state,{players})

        case ADD_PLAYER:
        const {player} = action.payload
        return Object.assign({},state,{player})

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
export function addPlayers(players){
    return {
        type: ADD_PLAYERS,
        payload: {players}
    }
}
export function addPlayer(player){
    return {
        type: ADD_PLAYER,
        payload: {player}
    }
}