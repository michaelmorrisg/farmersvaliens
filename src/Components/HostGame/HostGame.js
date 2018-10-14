import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {createRoom} from '../../ducks/reducer'
import {connect} from 'react-redux'

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
        if(id){
            axios.post('/api/hostgame', {roomId:id}).then(res => {
                if(res.data === 'room exists'){
                    alert('Oops! Room already taken!')
                } else {
                    this.props.createRoom(this.state.roomId)
                    this.setState({
                        toHost: true
                    })
                }
            })
        } else {
            alert('Enter an ID, ya bumkin')
        }
    }

    render(){

        return(
            <div>
                <h1>Host Game</h1>
                <h2>Enter Room ID</h2>
                <input onChange={(e)=>this.handleInput(e.target.value)} placeholder="Room ID..." />
                <button onClick={()=>this.createGame(this.state.roomId)}>Create Game</button>
                {this.state.toHost ? <Redirect to="/hosting"/> : ''}
            </div>
        )
    }
}
export default connect(null,{createRoom})(HostGame)