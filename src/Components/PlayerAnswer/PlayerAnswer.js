import React, {Component} from 'react'
import io from "socket.io-client"
import {connect} from 'react-redux'

const socket = io.connect("http://localhost:3020")

class PlayerAnswer extends Component {

    componentDidMount(){
        socket.emit('join-room', {roomId: this.props.roomId})
    }

    sendAnswer(input){
        socket.emit('player-submitted-answer', {answer:input, roomId:this.props.roomId, player: this.props.player})
    }

    render(){
        return(
            <div>
                <button onClick={()=>this.sendAnswer("A")}>A</button>
                <button onClick={()=>this.sendAnswer("B")}>B</button>
                <button onClick={()=>this.sendAnswer("C")}>C</button>
                <button onClick={()=>this.sendAnswer("D")}>D</button>
            </div>
        )
    }
}
function mapStateToProps(state){
    const {roomId, player} = state
    return {roomId, player}
}
export default connect(mapStateToProps)(PlayerAnswer)