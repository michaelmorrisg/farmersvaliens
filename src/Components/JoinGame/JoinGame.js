import React, {Component} from 'react'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3020")

class JoinGame extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            roomId: ''
        }
    }

    handleUser(input){
        this.setState({
            username: input
        })
    }
    handleRoom(input){
        this.setState({
            roomId: input
        })
    }
    joinGame(){
        axios.post('/api/joingame', this.state).then(res => {
            if(res.data === 'room not found'){
                alert('Room not found, ya bumkin')
            } else {
                console.log(res.data)
            }
        })
    }

    render(){
        return(
            <div>
                <h1>Join Game</h1>
                <h2>Username</h2>
                <input onChange={(e)=>this.handleUser(e.target.value)} placeholder="Username..."/>
                <h2>Room ID</h2>
                <input onChange={(e)=>this.handleRoom(e.target.value)} placeholder="Room ID"/>
                <button onClick={()=>this.joinGame()}>Join Game</button>
            </div>
        )
    }
}
export default JoinGame