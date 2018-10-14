import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class HostGame extends Component {
    constructor(){
        super()
        this.state = {
            roomId: '',
            toHost: false
        }
    }

    handleInput(input){
        this.setState({
            roomId: input
        })
    }

    createGame(id){
        axios.post('/api/hostgame', {roomId:this.state.roomId}).then(res => {
            this.setState({
                toHost: true
            })
        })
    }

    render(){

        return(
            <div>
                <h1>Host Game</h1>
                <h2>Enter Room ID</h2>
                <input onChange={(e)=>this.handleInput(e.target.value)} placeholder="Room ID..." />
                <button onClick={()=>this.createGame(this.state.roomId)}>Create Game</button>
                {this.state.toHost ? <Redirect to="/host"/> : ''}
            </div>
        )
    }
}
export default HostGame