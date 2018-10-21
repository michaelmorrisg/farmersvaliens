import React, {Component} from 'react'
import {connect} from 'react-redux'
import io from 'socket.io-client'
import {Redirect} from 'react-router-dom'

const socket = io.connect("http://localhost:3020")

class PlayerWaiting extends Component {
    constructor(){
        super()
        this.state = {
            toPlayerPassive: false
        }

        socket.on('going-to-player-passive', ()=>{
            this.setState({
                toPlayerPassive: true
            })
        })
    }

    componentDidMount(){
        socket.emit('join-room', {roomId: this.props.roomId})
    }

startGame(){
    socket.emit('to-player-passive', {roomId: this.props.roomId})
}

    render(){
        return(
            <div>
                <h1>Waiting for other humans</h1>
                {this.props.admin === true ? <button onClick={()=>this.startGame()}>Start!</button> : ''}
                {this.state.toPlayerPassive ? <Redirect to="/playerpassive"/>: ''}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {admin, roomId} = state
    return {admin, roomId}
}
export default connect(mapStateToProps)(PlayerWaiting)