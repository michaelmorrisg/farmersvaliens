import React, {Component} from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import './JoinGame.css'

const socket = io.connect("http://localhost:3020")

class JoinGame extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            roomId: '',
            eyes: 0
        }
    }

    handleUser(input){
        this.setState(function(state,props) {
            return{
                username: input,
                eyes: this.state.username.length * .75
            }
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
    moveEyes(){
        document.getElementById("passive-left").id = 'looking-left'
        document.getElementById("passive-right").id = 'looking-right'
        document.getElementById("closed").id = 'open'
    }
    passiveEyes(){
        document.getElementById("looking-left").id = 'passive-left'
        document.getElementById("looking-right").id = 'passive-right'
        document.getElementById("open").id = 'closed'
    }

    render(){
        return(
            <div>
                <h1>Join Game</h1>
                <div className="alien-area">
                    <div className="alien-head">
                        <div className="left-eye">
                            <div className="left-pupil" id="passive-left" style={{marginLeft:`${this.state.eyes}px`}}></div>
                        </div>
                        <div className="right-eye">
                        <div className="left-pupil" id="passive-right" style={{marginLeft:`${this.state.eyes}px`}}></div>
                        </div>
                        <div className="mouth" id="closed">
                        </div>
                    </div>
                </div>
                <h2>Username</h2>
                <input onFocus={()=>this.moveEyes()} onBlur={()=>this.passiveEyes()}onChange={(e)=>this.handleUser(e.target.value)} placeholder="Username..."/>
                <h2>Room ID</h2>
                <input onChange={(e)=>this.handleRoom(e.target.value)} placeholder="Room ID"/>
                <button onClick={()=>this.joinGame()}>Join Game</button>
            </div>
        )
    }
}
export default JoinGame