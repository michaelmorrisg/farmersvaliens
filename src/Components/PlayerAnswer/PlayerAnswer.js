import React, {Component} from 'react'
import io from "socket.io-client"
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const socket = io.connect("http://localhost:3020")

class PlayerAnswer extends Component {
    constructor(){
        super()
        this.state = {
            toPassive: false
        }

        socket.on('going-to-player-passive', ()=>{
            this.setState({
                toPassive: true
            })
        })
    }

    componentDidMount(){
        socket.emit('join-room', {roomId: this.props.roomId})
    }

    sendAnswer(input){
        socket.emit('player-submitted-answer', {answer:input, roomId:this.props.roomId, player: this.props.player})
        this.setState({
            toPassive: true
        })
    }

    render(){
        return(
            <div>
                <button onClick={()=>this.sendAnswer(0)}>A</button>
                <button onClick={()=>this.sendAnswer(1)}>B</button>
                <button onClick={()=>this.sendAnswer(2)}>C</button>
                <button onClick={()=>this.sendAnswer(3)}>D</button>
                {this.state.toPassive ? <Redirect to="playerpassive"/> : ''}
            </div>
        )
    }
}
function mapStateToProps(state){
    const {roomId, player} = state
    return {roomId, player}
}
export default connect(mapStateToProps)(PlayerAnswer)